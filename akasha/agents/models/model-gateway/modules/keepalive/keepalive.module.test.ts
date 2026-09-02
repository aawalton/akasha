import { expect, test } from "bun:test"
import { buildKeepaliveEmitter, type KeepaliveTimers } from "./keepalive.module.code.ts"

const INTERVAL_MS = 3500

const NEVER_MS = 2_147_483_647

const noop = (): undefined => undefined

function heldTimers(): {
  readonly timers: KeepaliveTimers
  readonly fireAll: () => undefined
  readonly armed: () => number
} {
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>()
  const timers: KeepaliveTimers = {
    set: (fn, _ms) => {
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
  }
}

test("an emitter fires only after the interval passes with nothing sent", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(INTERVAL_MS, () => (sent += 1), clock.timers)
  expect(clock.armed()).toBe(0)
  emitter.reset()
  expect(clock.armed()).toBe(1)
  expect(sent).toBe(0)
})

test("firing arms the next fire", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(INTERVAL_MS, () => (sent += 1), clock.timers)
  emitter.reset()
  clock.fireAll()
  expect(sent).toBe(1)
  expect(clock.armed()).toBe(1)
})

test("an emitter that is never stopped fires for the life of the process", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(INTERVAL_MS, () => (sent += 1), clock.timers)
  emitter.reset()
  for (let turn = 0; turn < 5; turn += 1) clock.fireAll()
  expect(sent).toBe(5)
  expect(clock.armed()).toBe(1)
})

test("a stopped emitter is stopped for good", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(INTERVAL_MS, () => (sent += 1), clock.timers)
  emitter.reset()
  emitter.stop()
  expect(clock.armed()).toBe(0)
  emitter.reset()
  expect(clock.armed()).toBe(0)
  clock.fireAll()
  expect(sent).toBe(0)
})

test("an emitter stopped while it is sending arms nothing further", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(
    INTERVAL_MS,
    () => {
      sent += 1
      emitter.stop()
    },
    clock.timers
  )
  emitter.reset()
  clock.fireAll()
  expect(sent).toBe(1)
  expect(clock.armed()).toBe(0)
})

test("resetting twice leaves one fire armed rather than two", () => {
  const clock = heldTimers()
  let sent = 0
  const emitter = buildKeepaliveEmitter(INTERVAL_MS, () => (sent += 1), clock.timers)
  emitter.reset()
  emitter.reset()
  expect(clock.armed()).toBe(1)
  clock.fireAll()
  expect(sent).toBe(1)
})
