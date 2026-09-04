import { expect, test } from "bun:test"
import {
  buildIdleGuard,
  fetchWithIdleGuard,
  type IdleFetch,
  type IdleTimers,
  UPSTREAM_IDLE_TIMEOUT_TOKEN,
} from "./idle-timeout.module.code.ts"

const IDLE_MS = 2_000

const NEVER_MS = 2_147_483_647

const PREFIX = "[test]"

const LABEL = "acct /v1/messages"

const UPSTREAM_URL = "https://api.example.invalid/v1/messages"

const noop = (): undefined => undefined

function heldTimers(): {
  readonly timers: IdleTimers
  readonly fireAll: () => undefined
  readonly armed: () => number
  readonly spans: () => readonly number[]
} {
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>()
  const spans: number[] = []
  const timers: IdleTimers = {
    set: (fn, ms) => {
      spans.push(ms)
      const handle = setTimeout(noop, NEVER_MS)
      pending.set(handle, fn)
      return handle
    },
    clear: (handle) => {
      clearTimeout(handle)
      pending.delete(handle)
    },
  }
  return {
    timers,
    fireAll: (): undefined => {
      const held = [...pending.entries()]
      pending.clear()
      for (const [handle, fn] of held) {
        clearTimeout(handle)
        fn()
      }
    },
    armed: () => pending.size,
    spans: () => spans,
  }
}

function heldFetch(body: string): {
  readonly send: IdleFetch
  readonly seen: () => RequestInit
} {
  let lastInit: RequestInit | null = null
  return {
    send: async (_url, init) => {
      lastInit = init
      return new Response(body, { status: 200 })
    },
    seen: () => {
      if (lastInit == null) throw new Error("the fetch was never called")
      return lastInit
    },
  }
}

function signalOf(init: RequestInit): AbortSignal {
  const signal = init.signal
  if (signal == null) throw new Error("the fetch was given no signal")
  return signal
}

function abortReason(signal: AbortSignal): DOMException {
  const reason = signal.reason
  if (reason instanceof DOMException) return reason
  throw new Error("the guard aborted with something other than a DOMException")
}

test("a guard fires only where the idle span passes with no reset", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  expect(clock.armed()).toBe(0)
  expect(guard.signal.aborted).toBe(false)
  guard.reset()
  expect(clock.armed()).toBe(1)
  expect(guard.signal.aborted).toBe(false)
})

test("a reset restarts the whole idle span", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  guard.reset()
  expect(clock.spans()).toEqual([IDLE_MS, IDLE_MS])
  expect(guard.signal.aborted).toBe(false)
})

test("resetting twice leaves one fire armed rather than two", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  guard.reset()
  expect(clock.armed()).toBe(1)
  clock.fireAll()
  expect(guard.signal.aborted).toBe(true)
})

test("a guard that fires aborts the signal the guarded fetch was given", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("ok")
  const guarded = await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST" },
    { idleMs: IDLE_MS, logPrefix: PREFIX, label: LABEL },
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  const given = signalOf(upstream.seen())
  expect(given.aborted).toBe(false)
  clock.fireAll()
  expect(given.aborted).toBe(true)
  expect(guarded.idle).toBeDefined()
})

test("a guard aborts with a DOMException named TimeoutError", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  clock.fireAll()
  expect(abortReason(guard.signal).name).toBe("TimeoutError")
})

test("the abort message opens with the token a reader matches an idle timeout by", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  clock.fireAll()
  const message = abortReason(guard.signal).message
  expect(message.startsWith(UPSTREAM_IDLE_TIMEOUT_TOKEN)).toBe(true)
  expect(message).toContain(`${IDLE_MS}ms`)
  expect(message).toContain(LABEL)
})

test("a stopped guard is stopped for good", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  guard.stop()
  expect(clock.armed()).toBe(0)
  guard.reset()
  expect(clock.armed()).toBe(0)
  clock.fireAll()
  expect(guard.signal.aborted).toBe(false)
})

test("whoever arms a guard stops the guard on every path the response can end by", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  expect(() => {
    try {
      throw new Error("the response ended by throwing")
    } finally {
      guard.stop()
    }
  }).toThrow("the response ended by throwing")
  expect(clock.armed()).toBe(0)
  expect(guard.signal.aborted).toBe(false)
})

test("a guarded fetch hands the guard back for the caller to reset on every chunk", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("ok")
  const guarded = await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST" },
    { idleMs: IDLE_MS, logPrefix: PREFIX, label: LABEL },
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  const idle = guarded.idle
  if (idle == null) throw new Error("a guarded fetch handed back no guard")
  expect(clock.armed()).toBe(1)
  idle.reset()
  idle.reset()
  expect(clock.armed()).toBe(1)
  expect(clock.spans()).toEqual([IDLE_MS, IDLE_MS, IDLE_MS])
  idle.stop()
  expect(clock.armed()).toBe(0)
})

test("a fetch given no spec is left unguarded", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("ok")
  const own = new AbortController()
  const guarded = await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST", signal: own.signal },
    null,
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  expect(guarded.idle).toBeUndefined()
  expect(clock.armed()).toBe(0)
  expect(clock.spans()).toEqual([])
  expect(signalOf(upstream.seen())).toBe(own.signal)
})

test("a fetch given an idle span of zero or less is left unguarded", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("ok")
  const guarded = await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST" },
    { idleMs: 0, logPrefix: PREFIX, label: LABEL },
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  expect(guarded.idle).toBeUndefined()
  expect(clock.armed()).toBe(0)
  expect(upstream.seen().signal).toBeUndefined()
})

test("a fetch that throws leaves the guard stopped before the error goes on", async () => {
  const clock = heldTimers()
  const failing: IdleFetch = async () => {
    throw new Error("upstream refused the connection")
  }
  await expect(
    fetchWithIdleGuard(
      UPSTREAM_URL,
      { method: "POST" },
      { idleMs: IDLE_MS, logPrefix: PREFIX, label: LABEL },
      { timers: clock.timers, fetchImpl: failing }
    )
  ).rejects.toThrow("upstream refused the connection")
  expect(clock.spans()).toEqual([IDLE_MS])
  expect(clock.armed()).toBe(0)
})

test("the timers are handed in so a test needs no wait", () => {
  const startedAt = Date.now()
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  clock.fireAll()
  expect(guard.signal.aborted).toBe(true)
  expect(clock.spans()).toEqual([IDLE_MS])
  expect(Date.now() - startedAt).toBeLessThan(IDLE_MS)
})

test("a guard that has already fired arms again on a later reset", () => {
  const clock = heldTimers()
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  guard.reset()
  clock.fireAll()
  expect(guard.signal.aborted).toBe(true)
  expect(clock.armed()).toBe(0)
  guard.reset()
  expect(clock.armed()).toBe(1)
})

test("an abort signal the caller passed in is dropped where a guard is armed", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("ok")
  const own = new AbortController()
  await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST", signal: own.signal },
    { idleMs: IDLE_MS, logPrefix: PREFIX, label: LABEL },
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  const given = signalOf(upstream.seen())
  expect(given).not.toBe(own.signal)
  own.abort()
  expect(own.signal.aborted).toBe(true)
  expect(given.aborted).toBe(false)
})

test("nothing here reads the bytes the guard is waiting for", async () => {
  const clock = heldTimers()
  const upstream = heldFetch("the whole body, untouched")
  const guarded = await fetchWithIdleGuard(
    UPSTREAM_URL,
    { method: "POST" },
    { idleMs: IDLE_MS, logPrefix: PREFIX, label: LABEL },
    { timers: clock.timers, fetchImpl: upstream.send }
  )
  expect(guarded.response.bodyUsed).toBe(false)
  expect(await guarded.response.text()).toBe("the whole body, untouched")
  const guard = buildIdleGuard(IDLE_MS, PREFIX, LABEL, clock.timers)
  expect(Object.keys(guard)).toEqual(["signal", "reset", "stop"])
})
