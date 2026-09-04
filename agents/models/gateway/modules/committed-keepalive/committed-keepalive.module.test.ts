import { afterEach, beforeEach, expect, mock, spyOn, test } from "bun:test"
import { buildHoldRegistry } from "../hold-registry/hold-registry.module.code.ts"
import type { KeepaliveTimers } from "../keepalive/keepalive.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import type { QueueOutcome } from "../pre-forward-queue/pre-forward-queue.module.code.ts"
import {
  buildCommittedKeepaliveResponse,
  type CommittedKeepaliveArgs,
  DEFAULT_HOLD_POLL_MS,
} from "./committed-keepalive.module.code.ts"

const HELD_FOREVER: QueueOutcome = {
  kind: "empty-pool",
  reason: "no-viable-account",
  trailDisplay: "-",
}

const SAID: { output: string[]; error: string[] } = { output: [], error: [] }

beforeEach(() => {
  SAID.output = []
  SAID.error = []
  spyOn(console, "log").mockImplementation((...parts: unknown[]) => {
    SAID.output.push(parts.map(String).join(" "))
  })
  spyOn(console, "error").mockImplementation((...parts: unknown[]) => {
    SAID.error.push(parts.map(String).join(" "))
  })
})

afterEach(() => {
  mock.restore()
})

type Handle = ReturnType<typeof setTimeout>

function countingTimers(): {
  timers: KeepaliveTimers
  armed: () => number
  fireAll: () => undefined
} {
  const pending = new Map<Handle, () => void>()
  const timers: KeepaliveTimers = {
    set: (fn) => {
      const handle = setTimeout(() => {}, 0)
      clearTimeout(handle)
      pending.set(handle, fn)
      return handle
    },
    clear: (handle) => {
      pending.delete(handle)
    },
  }
  return {
    timers,
    armed: () => pending.size,
    fireAll: (): undefined => {
      for (const [handle, fire] of [...pending]) {
        pending.delete(handle)
        fire()
      }
    },
  }
}

function argsWith(overrides: Partial<CommittedKeepaliveArgs> = {}): CommittedKeepaliveArgs {
  const observerSlot: ObserverSlot = { current: null }
  return {
    observerSlot,
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[test]",
    attempted: async () => HELD_FOREVER,
    slept: () => new Promise<undefined>(() => {}),
    now: () => 1_000,
    ...overrides,
  }
}

async function drain(res: Response): Promise<string> {
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let seen = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value !== undefined) seen += decoder.decode(value)
  }
  return seen
}

test("the hold polls every two seconds where the caller names no span", () => {
  expect(DEFAULT_HOLD_POLL_MS).toBe(2000)
})

test("a committed response is a 200 event stream", () => {
  const res = buildCommittedKeepaliveResponse(argsWith())
  expect(res.status).toBe(200)
  expect(res.headers.get("content-type")).toBe("text/event-stream; charset=utf-8")
})

test("a committed response tells caches to keep nothing", () => {
  const res = buildCommittedKeepaliveResponse(argsWith())
  expect(res.headers.get("cache-control")).toBe("no-cache")
})

test("a client that disconnects while held stops the keepalive", async () => {
  const { timers, armed, fireAll } = countingTimers()
  const res = buildCommittedKeepaliveResponse(argsWith({ timers }))
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")
  const reader = body.getReader()
  await reader.read()
  expect(armed()).toBe(1)
  await reader.cancel("client went away")
  expect(armed()).toBe(0)
  fireAll()
  expect(armed()).toBe(0)
})

test("a keepalive stopped by a disconnect re-arms itself never", async () => {
  const { timers, armed, fireAll } = countingTimers()
  const res = buildCommittedKeepaliveResponse(argsWith({ timers }))
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")
  const reader = body.getReader()
  await reader.read()
  await reader.cancel("client went away")
  for (let round = 0; round < 5; round += 1) fireAll()
  expect(armed()).toBe(0)
})

test("a disconnect releases the hold", async () => {
  const { timers } = countingTimers()
  const registry = buildHoldRegistry()
  const res = buildCommittedKeepaliveResponse(argsWith({ timers, holdRegistry: registry }))
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")
  const reader = body.getReader()
  await reader.read()
  expect(registry.snapshot(2_000).heldCount).toBe(1)
  await reader.cancel("client went away")
  expect(registry.snapshot(2_000).heldCount).toBe(0)
})

test("an attempt that rejects ends the stream and releases the hold", async () => {
  const { timers, armed } = countingTimers()
  const registry = buildHoldRegistry()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      holdRegistry: registry,
      attempted: () => Promise.reject(new Error("the walk threw")),
    })
  )
  const seen = await drain(res)
  expect(seen).toContain("api_error")
  expect(registry.snapshot(2_000).heldCount).toBe(0)
  expect(armed()).toBe(0)
})

test("an attempt that rejects is written about on the error seam", async () => {
  const { timers } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({ timers, attempted: () => Promise.reject(new Error("the walk threw")) })
  )
  await drain(res)
  expect(SAID.error.join("\n")).toContain("phase=failed")
})

test("a served 200 is spliced through to the client", async () => {
  const { timers } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      attempted: async () => ({
        kind: "served",
        response: new Response("data: hello\n\n", { status: 200 }),
      }),
    })
  )
  const seen = await drain(res)
  expect(seen).toContain("data: hello")
})

test("a splice is preceded by one keepalive comment", async () => {
  const { timers } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      attempted: async () => ({
        kind: "served",
        response: new Response("data: hello\n\n", { status: 200 }),
      }),
    })
  )
  const seen = await drain(res)
  expect(seen.startsWith(": keepalive\n")).toBe(true)
})

test("a served error status becomes an sse error frame rather than a splice", async () => {
  const { timers } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      attempted: async () => ({
        kind: "served",
        response: new Response("nope", { status: 429 }),
      }),
    })
  )
  const seen = await drain(res)
  expect(seen).toContain("rate_limit_error")
  expect(seen).not.toContain("nope")
})

test("a served error status stops the keepalive", async () => {
  const { timers, armed } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      attempted: async () => ({ kind: "served", response: new Response("", { status: 503 }) }),
    })
  )
  await drain(res)
  expect(armed()).toBe(0)
})

test("an empty pool is polled again after the hold span", async () => {
  const { timers } = countingTimers()
  const waited: number[] = []
  let turns = 0
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      holdPollMs: 5,
      attempted: async () => {
        turns += 1
        return turns < 3
          ? HELD_FOREVER
          : { kind: "served" as const, response: new Response("ok", { status: 200 }) }
      },
      slept: async (ms): Promise<undefined> => {
        waited.push(ms)
      },
    })
  )
  await drain(res)
  expect(waited).toEqual([5, 5])
})

test("the observer slot is filled before the first attempt is made", () => {
  const observerSlot: ObserverSlot = { current: null }
  buildCommittedKeepaliveResponse(argsWith({ observerSlot }))
  expect(observerSlot.current).not.toBe(null)
})

test("a hold that reaches no log seam records no transport row", async () => {
  const { timers } = countingTimers()
  const res = buildCommittedKeepaliveResponse(
    argsWith({
      timers,
      attempted: async () => ({ kind: "served", response: new Response("ok", { status: 200 }) }),
    })
  )
  await drain(res)
  expect(SAID.error).toEqual([])
})

test("the hold is entered at the moment the clock handed in answers", () => {
  const registry = buildHoldRegistry()
  buildCommittedKeepaliveResponse(argsWith({ holdRegistry: registry, now: () => 7_777 }))
  expect(registry.snapshot(8_777).oldestHeldMs).toBe(1_000)
})

test("a keepalive span of zero arms no heartbeat", async () => {
  const { timers, armed } = countingTimers()
  const res = buildCommittedKeepaliveResponse(argsWith({ timers, keepaliveMs: 0 }))
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")
  const reader = body.getReader()
  await reader.read()
  expect(armed()).toBe(0)
  await reader.cancel("done")
})
