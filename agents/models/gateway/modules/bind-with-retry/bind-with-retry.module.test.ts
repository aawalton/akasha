import { expect, test } from "bun:test"
import { type BindRetryClock, bindWithRetry } from "./bind-with-retry.module.code.ts"

const PORT = 4321

const PREFIX = "[test]"

const BUDGET_MS = 100

const INTERVAL_MS = 40

const addrInUseError = (message: string): Error =>
  Object.assign(new Error(message), { code: "EADDRINUSE" })

function heldClock(): {
  readonly clock: BindRetryClock
  readonly slept: () => readonly number[]
} {
  let nowMs = 0
  const slept: number[] = []
  return {
    clock: {
      now: () => nowMs,
      sleep: (ms): undefined => {
        slept.push(ms)
        nowMs += ms
      },
    },
    slept: () => slept,
  }
}

test("a bind returns what the attempt returns", () => {
  const held = heldClock()
  const port = bindWithRetry(PORT, PREFIX, () => PORT, {
    budgetMs: BUDGET_MS,
    intervalMs: INTERVAL_MS,
    clock: held.clock,
  })
  expect(port).toBe(PORT)
  expect(held.slept()).toEqual([])
})

test("an error names EADDRINUSE by its code", () => {
  const held = heldClock()
  let tries = 0
  const port = bindWithRetry(
    PORT,
    PREFIX,
    () => {
      tries += 1
      if (tries < 3) throw addrInUseError("bind failed")
      return PORT
    },
    { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
  )
  expect(port).toBe(PORT)
  expect(tries).toBe(3)
  expect(held.slept()).toEqual([INTERVAL_MS, INTERVAL_MS])
})

test("an error names EADDRINUSE by its message", () => {
  const held = heldClock()
  let tries = 0
  const port = bindWithRetry(
    PORT,
    PREFIX,
    () => {
      tries += 1
      if (tries < 2) throw new Error("listen EADDRINUSE: address already in use")
      return PORT
    },
    { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
  )
  expect(port).toBe(PORT)
  expect(tries).toBe(2)
})

test("a bind is retried only where the error names EADDRINUSE", () => {
  const held = heldClock()
  let tries = 0
  expect(() =>
    bindWithRetry(
      PORT,
      PREFIX,
      (): number => {
        tries += 1
        throw new Error("EACCES: permission denied")
      },
      { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("EACCES: permission denied")
  expect(tries).toBe(1)
  expect(held.slept()).toEqual([])
})

test("a bind on port zero is never retried", () => {
  const held = heldClock()
  let tries = 0
  expect(() =>
    bindWithRetry(
      0,
      PREFIX,
      (): number => {
        tries += 1
        throw addrInUseError("bind failed")
      },
      { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("bind failed")
  expect(tries).toBe(1)
  expect(held.slept()).toEqual([])
})

test("the budget covers the whole run of attempts rather than each attempt", () => {
  const held = heldClock()
  let tries = 0
  expect(() =>
    bindWithRetry(
      PORT,
      PREFIX,
      (): number => {
        tries += 1
        throw addrInUseError("bind failed")
      },
      { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("bind failed")
  expect(tries).toBe(4)
  expect(held.slept()).toEqual([INTERVAL_MS, INTERVAL_MS, INTERVAL_MS])
})

test("retries are spaced by a fixed interval rather than a growing one", () => {
  const held = heldClock()
  expect(() =>
    bindWithRetry(
      PORT,
      PREFIX,
      (): number => {
        throw addrInUseError("bind failed")
      },
      { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("bind failed")
  for (const waited of held.slept()) expect(waited).toBe(INTERVAL_MS)
})

test("the error ending the last attempt is the error thrown once the budget runs out", () => {
  const held = heldClock()
  let tries = 0
  expect(() =>
    bindWithRetry(
      PORT,
      PREFIX,
      (): number => {
        tries += 1
        throw addrInUseError(`bind failed on try ${tries}`)
      },
      { budgetMs: BUDGET_MS, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("bind failed on try 4")
})

test("a budget already spent leaves one attempt made", () => {
  const held = heldClock()
  let tries = 0
  expect(() =>
    bindWithRetry(
      PORT,
      PREFIX,
      (): number => {
        tries += 1
        throw addrInUseError("bind failed")
      },
      { budgetMs: 0, intervalMs: INTERVAL_MS, clock: held.clock }
    )
  ).toThrow("bind failed")
  expect(tries).toBe(1)
  expect(held.slept()).toEqual([])
})
