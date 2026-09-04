import { expect, test } from "bun:test"
import type { IdleFetch, IdleTimers } from "../idle-timeout/idle-timeout.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import type { ArmableStreamObserver } from "../transport-log/transport-log.module.code.ts"
import { buildForward, type Forward } from "./forward.module.code.ts"

const LOG_PREFIX = "[forward-test]"

const NOW_MS = 1_700_000_000_000

const GATEWAY_BASE = "https://gateway.local"

type Deps = Parameters<typeof buildForward>[0]

type Sent = { url: string; init: RequestInit }

type Fire = Parameters<IdleTimers["set"]>[0]

type Armed = { fn: Fire; ms: number }

type Timing = { armed: Armed[]; clears: number }

type Call = { name: string; first: unknown }

function forwardWith(over: Partial<Deps>): Forward {
  return buildForward({
    idleTimeoutMs: 0,
    downstreamKeepaliveMs: 0,
    logPrefix: LOG_PREFIX,
    now: () => NOW_MS,
    ...over,
  })
}

function ask(path: string, headers: Record<string, string> = {}): Request {
  return new Request(`${GATEWAY_BASE}${path}`, { method: "POST", headers })
}

function plain(): Response {
  return new Response("upstream body", {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

function sender(sent: Sent[], make: () => Response): IdleFetch {
  return (url, init) => {
    sent.push({ url, init })
    return Promise.resolve(make())
  }
}

function fakeTimers(timing: Timing): IdleTimers {
  return {
    set: (fn, ms) => {
      timing.armed.push({ fn, ms })
      return setTimeout(() => {}, 0)
    },
    clear: (handle) => {
      timing.clears += 1
      clearTimeout(handle)
    },
  }
}

function watch(observer: ArmableStreamObserver, calls: Call[]): undefined {
  const status = observer.onUpstreamStatus
  observer.onUpstreamStatus = (code, atMs): undefined => {
    calls.push({ name: "status", first: code })
    status?.(code, atMs)
  }
  const complete = observer.onComplete
  observer.onComplete = (atMs): undefined => {
    calls.push({ name: "complete", first: atMs })
    complete(atMs)
  }
  const cancelled = observer.onDownstreamCancel
  observer.onDownstreamCancel = (reason, atMs): undefined => {
    calls.push({ name: "cancel", first: reason })
    cancelled(reason, atMs)
  }
  const gone = observer.onClientDisconnect
  observer.onClientDisconnect = (reason, atMs): undefined => {
    calls.push({ name: "disconnect", first: reason })
    gone?.(reason, atMs)
  }
}

function bareSlot(): ObserverSlot {
  return { current: null }
}

function watchedSlot(calls: Call[], endInFlight?: () => undefined): ObserverSlot {
  let held: ArmableStreamObserver | null = null
  return {
    get current(): ArmableStreamObserver | null {
      return held
    },
    set current(next: ArmableStreamObserver | null) {
      held = next
      if (next !== null) watch(next, calls)
    },
    endInFlight,
  }
}

test("the upstream url is the anthropic base with the path and the query", async () => {
  const sent: Sent[] = []
  const forward = forwardWith({ fetchImpl: sender(sent, plain) })
  await forward(ask("/v1/messages?beta=true"), "tok", null, null, bareSlot())
  expect(sent[0]?.url).toBe("https://api.anthropic.com/v1/messages?beta=true")
  expect(sent[0]?.init.method).toBe("POST")
})

test("the hop-by-hop headers are dropped and the token becomes the bearer", async () => {
  const sent: Sent[] = []
  const forward = forwardWith({ fetchImpl: sender(sent, plain) })
  const incoming = ask("/v1/messages", {
    authorization: "Bearer client",
    connection: "close",
    host: "gateway.local",
    "content-length": "9",
    "anthropic-version": "2023-06-01",
  })
  await forward(incoming, "upstream-token", null, null, bareSlot())
  const headers = new Headers(sent[0]?.init.headers)
  expect(headers.get("authorization")).toBe("Bearer upstream-token")
  expect(headers.get("anthropic-version")).toBe("2023-06-01")
  expect(headers.has("connection")).toBe(false)
  expect(headers.has("host")).toBe(false)
  expect(headers.has("content-length")).toBe(false)
})

test("a request handed no token carries the authorization it arrived with", async () => {
  const sent: Sent[] = []
  const forward = forwardWith({ fetchImpl: sender(sent, plain) })
  const incoming = ask("/v1/messages", { authorization: "Bearer client" })
  await forward(incoming, null, null, null, bareSlot())
  expect(new Headers(sent[0]?.init.headers).get("authorization")).toBe("Bearer client")
})

test("a request holding no authorization of either sort is sent with none", async () => {
  const sent: Sent[] = []
  const forward = forwardWith({ fetchImpl: sender(sent, plain) })
  await forward(ask("/v1/messages"), null, null, null, bareSlot())
  expect(new Headers(sent[0]?.init.headers).has("authorization")).toBe(false)
})

test("the body buffer handed in is the body sent upstream", async () => {
  const sent: Sent[] = []
  const forward = forwardWith({ fetchImpl: sender(sent, plain) })
  const buffer = new ArrayBuffer(16)
  await forward(ask("/v1/messages"), "tok", buffer, null, bareSlot())
  expect(sent[0]?.init.body).toBe(buffer)
})

test("the response carries the upstream status and the copied headers", async () => {
  const make = (): Response =>
    new Response("nope", {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "content-encoding": "gzip",
        "content-type": "application/json",
        "x-ratelimit-remaining": "0",
      },
    })
  const forward = forwardWith({ fetchImpl: sender([], make) })
  const res = await forward(ask("/v1/messages"), "tok", null, null, bareSlot())
  expect(res.status).toBe(429)
  expect(res.statusText).toBe("Too Many Requests")
  expect(res.headers.get("x-ratelimit-remaining")).toBe("0")
  expect(res.headers.has("content-encoding")).toBe(false)
  expect(await res.text()).toBe("nope")
})

test("a slot carrying no end beside no log file is left holding nothing", async () => {
  const slot = bareSlot()
  const forward = forwardWith({ fetchImpl: sender([], plain) })
  await forward(ask("/v1/messages"), "tok", null, null, slot)
  expect(slot.current).toBe(null)
})

test("an observer is built where the slot carries an end", async () => {
  const slot = bareSlot()
  slot.endInFlight = (): undefined => {}
  const forward = forwardWith({ fetchImpl: sender([], plain) })
  await forward(ask("/v1/messages"), "tok", null, null, slot)
  expect(slot.current).not.toBe(null)
})

test("an observer is built where a log file is handed in", async () => {
  const slot = bareSlot()
  const forward = forwardWith({
    fetchImpl: sender([], plain),
    logAt: "/var/tmp/fwd-build-9002/nowhere/nowhere.module.ts",
  })
  await forward(ask("/v1/messages"), "tok", null, null, slot)
  expect(slot.current).not.toBe(null)
})

test("the upstream status reaches the observer", async () => {
  const calls: Call[] = []
  const make = (): Response => new Response("gateway said no", { status: 502 })
  const forward = forwardWith({ fetchImpl: sender([], make) })
  const res = await forward(
    ask("/v1/messages"),
    "tok",
    null,
    "acct",
    watchedSlot(calls, (): undefined => {})
  )
  expect(res.status).toBe(502)
  expect(calls.filter((one) => one.name === "status").map((one) => one.first)).toEqual([502])
})

test("an observer already in the slot is ended before the new observer lands", async () => {
  const calls: Call[] = []
  const slot = watchedSlot(calls, (): undefined => {})
  const forward = forwardWith({ fetchImpl: sender([], plain) })
  await forward(ask("/v1/messages"), "tok", null, "acct", slot)
  const first = slot.current
  await forward(ask("/v1/messages"), "tok", null, "acct", slot)
  expect(slot.current).not.toBe(first)
  expect(calls.filter((one) => one.first === "observer_replaced").length).toBe(1)
})

test("a response the upstream gives no body for ends its observer at once", async () => {
  const calls: Call[] = []
  const make = (): Response => new Response(null, { status: 204 })
  const forward = forwardWith({ fetchImpl: sender([], make) })
  const res = await forward(
    ask("/v1/messages"),
    "tok",
    null,
    "acct",
    watchedSlot(calls, (): undefined => {})
  )
  expect(res.body).toBe(null)
  expect(calls.filter((one) => one.name === "complete").length).toBe(1)
})

test("a cancelled downstream stream reaches the observer", async () => {
  const calls: Call[] = []
  const make = (): Response =>
    new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("event: ping\n"))
        },
      }),
      { status: 200, headers: { "content-type": "text/event-stream" } }
    )
  const forward = forwardWith({ fetchImpl: sender([], make) })
  const res = await forward(
    ask("/v1/messages"),
    "tok",
    null,
    "acct",
    watchedSlot(calls, (): undefined => {})
  )
  await res.body?.cancel("client went away")
  expect(calls.filter((one) => one.first === "client went away").length).toBe(1)
})

test("an idle guard is armed on the messages path", async () => {
  const timing: Timing = { armed: [], clears: 0 }
  const sent: Sent[] = []
  const forward = forwardWith({
    idleTimeoutMs: 5000,
    timers: fakeTimers(timing),
    fetchImpl: sender(sent, plain),
  })
  const res = await forward(ask("/v1/messages"), "tok", null, "acct", bareSlot())
  expect(timing.armed[0]?.ms).toBe(5000)
  expect(sent[0]?.init.signal).not.toBe(undefined)
  await res.text()
  expect(timing.clears).toBeGreaterThan(0)
})

test("a guard that fires aborts the fetch the request is sent by", async () => {
  const timing: Timing = { armed: [], clears: 0 }
  const slot = bareSlot()
  slot.endInFlight = (): undefined => {}
  const forward = forwardWith({
    idleTimeoutMs: 5000,
    timers: fakeTimers(timing),
    fetchImpl: (url, init) => {
      expect(url).toContain("/v1/messages")
      timing.armed[0]?.fn()
      return Promise.reject(init.signal?.reason)
    },
  })
  const thrown = await forward(ask("/v1/messages"), "tok", null, "acct", slot).catch(
    (why: unknown) => why
  )
  expect(thrown).toBeInstanceOf(DOMException)
  expect(slot.current).toBe(null)
})

test("a path neither messages API answers is sent unguarded", async () => {
  const timing: Timing = { armed: [], clears: 0 }
  const sent: Sent[] = []
  const forward = forwardWith({
    idleTimeoutMs: 5000,
    timers: fakeTimers(timing),
    fetchImpl: sender(sent, plain),
  })
  await forward(ask("/v1/models"), "tok", null, "acct", bareSlot())
  expect(timing.armed.length).toBe(0)
  expect(sent[0]?.init.signal).toBe(undefined)
})

test("an idle span of zero leaves the request unguarded", async () => {
  const timing: Timing = { armed: [], clears: 0 }
  const sent: Sent[] = []
  const forward = forwardWith({
    idleTimeoutMs: 0,
    timers: fakeTimers(timing),
    fetchImpl: sender(sent, plain),
  })
  await forward(ask("/v1/messages/count_tokens"), "tok", null, "acct", bareSlot())
  expect(timing.armed.length).toBe(0)
  expect(sent[0]?.init.signal).toBe(undefined)
})
