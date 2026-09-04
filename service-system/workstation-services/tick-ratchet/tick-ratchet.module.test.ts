import { expect, test } from "bun:test"
import { TICKS_BEFORE_ENDING, tickRatchet } from "./tick-ratchet.module.code.ts"

test("a fresh ratchet is not spent", () => {
  const ratchet = tickRatchet("here")
  expect(ratchet.spent()).toBe(false)
})

test("throws short of the threshold do not spend it", () => {
  const ratchet = tickRatchet("here", 3)
  expect(ratchet.threw()).toBe(1)
  expect(ratchet.threw()).toBe(2)
  expect(ratchet.spent()).toBe(false)
})

test("the threshold spends it", () => {
  const ratchet = tickRatchet("here", 3)
  ratchet.threw()
  ratchet.threw()
  expect(ratchet.threw()).toBe(3)
  expect(ratchet.spent()).toBe(true)
})

test("a tick that works resets the run", () => {
  const ratchet = tickRatchet("here", 2)
  ratchet.threw()
  ratchet.worked()
  expect(ratchet.threw()).toBe(1)
  expect(ratchet.spent()).toBe(false)
})

test("a threshold of one spends on the first throw", () => {
  const ratchet = tickRatchet("here", 1)
  ratchet.threw()
  expect(ratchet.spent()).toBe(true)
})

test("`why` names the service, the run and the threshold", () => {
  const ratchet = tickRatchet("surplus-fall-notifier", 3)
  ratchet.threw()
  ratchet.threw()
  ratchet.threw()
  const why = ratchet.why()
  expect(why).toContain("surplus-fall-notifier")
  expect(why).toContain("3 ticks in a row")
  expect(why).toContain("the 3 it is allowed")
})

test("a threshold below one is refused rather than never spending", () => {
  expect(() => tickRatchet("here", 0)).toThrow("whole ticks from one")
  expect(() => tickRatchet("here", 1.5)).toThrow("whole ticks from one")
})

test("the stated default is a whole number of ticks above one", () => {
  expect(Number.isInteger(TICKS_BEFORE_ENDING)).toBe(true)
  expect(TICKS_BEFORE_ENDING).toBeGreaterThan(1)
})
