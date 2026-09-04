import { expect, test } from "bun:test"
import { ceilingIn } from "./tick-ceiling.module.code.ts"

test("a ceiling still ahead is not reached", () => {
  expect(ceilingIn(60_000).reached()).toBe(false)
})

test("a ceiling of no time at all is reached at once", () => {
  expect(ceilingIn(0).reached()).toBe(true)
})

test("a refusal is handed back rather than thrown, and names what the tick was still doing", () => {
  const refusal = ceilingIn(300_000).refuse("answering failures a later pipeline cured")
  expect(refusal).toBeInstanceOf(Error)
  expect(refusal.message).toContain("ci-orchestrator:")
  expect(refusal.message).toContain("answering failures a later pipeline cured")
  expect(refusal.message).toContain("300000ms")
})
