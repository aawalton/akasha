import { expect, test } from "bun:test"
import {
  ALLOWED,
  allowedAgain,
  allowedThrough,
  MEASURED_ALLOWED,
  saidOf,
  secondsIn,
  watching,
  watchOf,
} from "./command-stopping.module.code.ts"

const NAMED = "akasha one"

const SECOND = 1000

test("the seconds a command is allowed are read off that command's own page", () => {
  expect(secondsIn({ timeout: 5 })).toBe(5)
})

test("a page stating no seconds is allowed the seconds this module names", () => {
  expect(secondsIn({})).toBe(ALLOWED)
  expect(secondsIn(null)).toBe(ALLOWED)
})

test("a page stating seconds that are no number above nothing is allowed the same", () => {
  expect(secondsIn({ timeout: "5" })).toBe(ALLOWED)
  expect(secondsIn({ timeout: 0 })).toBe(ALLOWED)
  expect(secondsIn({ timeout: -1 })).toBe(ALLOWED)
})

test("the watch counts the seconds it was allowed as milliseconds", () => {
  expect(watchOf(30, "said", 7)).toContain("30000")
})

test("the watch ends the process it was told the number of", () => {
  expect(watchOf(30, "said", 7)).toContain('process.kill(7, "SIGKILL")')
})

test("the watch says why before ending the process", () => {
  const body = watchOf(30, saidOf(NAMED, 30), 7)

  expect(body.indexOf("console.error")).toBeLessThan(body.indexOf("process.kill"))
  expect(body).toContain(NAMED)
})

test("what is said names the call and the seconds that call was allowed", () => {
  expect(saidOf(NAMED, 30)).toContain(NAMED)
  expect(saidOf(NAMED, 30)).toContain("30 seconds")
})

test("what is said sends a ceiling that wants raising to Alan", () => {
  expect(saidOf(NAMED, 30)).toContain("Ask Alan")
})

test("a call measuring is allowed more seconds than a call this module names the seconds for", () => {
  expect(MEASURED_ALLOWED).toBeGreaterThan(ALLOWED)
})

test("a call may be allowed more seconds while that call runs", async () => {
  const watch = watching(1, NAMED)
  allowedAgain(MEASURED_ALLOWED, NAMED)
  const at = Date.now()

  await Bun.sleep(SECOND + SECOND / 2)
  watch.ended()

  expect(Date.now() - at).toBeGreaterThan(SECOND)
})

test("a call may be allowed the rest of its run under no ceiling", async () => {
  const watch = watching(1, NAMED)
  allowedThrough()
  const at = Date.now()

  await Bun.sleep(SECOND + SECOND / 2)
  watch.ended()

  expect(Date.now() - at).toBeGreaterThan(SECOND)
})

test("allowing a call through where no watch is live leaves it with no watch", () => {
  watching(1, NAMED).ended()

  expect(() => allowedThrough()).not.toThrow()
})
