import { expect, test } from "bun:test"
import { ALLOWED, heldTo, saidOf, secondsIn } from "./command-stopping.module.code.ts"

const NAMED = "akasha one"

test("the seconds a command is allowed are read off that command's own page", () => {
  expect(secondsIn({ timeout: 5 })).toBe(5)
})

test("a page stating no seconds is allowed thirty", () => {
  expect(secondsIn({})).toBe(ALLOWED)
  expect(secondsIn(null)).toBe(ALLOWED)
})

test("a page stating seconds that are no number above nothing is allowed thirty", () => {
  expect(secondsIn({ timeout: "5" })).toBe(ALLOWED)
  expect(secondsIn({ timeout: 0 })).toBe(ALLOWED)
  expect(secondsIn({ timeout: -1 })).toBe(ALLOWED)
})

test("a command answering without a promise runs past nothing", async () => {
  expect(await heldTo(0.01, NAMED, "said")).toEqual({ answer: "said" })
})

test("an answer given before the seconds run out is the answer", async () => {
  expect(await heldTo(30, NAMED, Promise.resolve("said"))).toEqual({ answer: "said" })
})

test("work running past the seconds is stopped", async () => {
  const slow = new Promise((keep) => setTimeout(() => keep("said"), 200))

  expect(await heldTo(0.01, NAMED, slow)).toEqual({ stopped: saidOf(NAMED, 0.01) })
})

test("what is said names the call and the seconds that call was allowed", () => {
  expect(saidOf(NAMED, 30)).toContain(NAMED)
  expect(saidOf(NAMED, 30)).toContain("30 seconds")
})
