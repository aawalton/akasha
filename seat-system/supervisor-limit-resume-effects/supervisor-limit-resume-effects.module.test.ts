import { expect, test } from "bun:test"
import { classifyRateLimitDeath } from "./supervisor-limit-resume-effects.module.code.ts"

const LIMITED = JSON.stringify({
  type: "assistant",
  isApiErrorMessage: true,
  apiErrorStatus: 429,
})

const PLAIN = JSON.stringify({ type: "assistant", isApiErrorMessage: false })

test("a transcript whose last assistant line is a 429 api error is a rate-limit death", () => {
  expect(classifyRateLimitDeath(LIMITED)).toBe(true)
})

test("a transcript carrying no assistant line is no rate-limit death", () => {
  expect(classifyRateLimitDeath(JSON.stringify({ type: "user" }))).toBe(false)
  expect(classifyRateLimitDeath("")).toBe(false)
})

test("only the last assistant line is weighed", () => {
  expect(classifyRateLimitDeath(`${LIMITED}\n${PLAIN}`)).toBe(false)
  expect(classifyRateLimitDeath(`${PLAIN}\n${LIMITED}`)).toBe(true)
})

test("a line that is no JSON object is passed over rather than ending the read", () => {
  expect(classifyRateLimitDeath(`not json\n[1,2]\n"said"\n${LIMITED}`)).toBe(true)
})

test("an api error at another status is no rate-limit death", () => {
  const other = JSON.stringify({ type: "assistant", isApiErrorMessage: true, apiErrorStatus: 500 })
  expect(classifyRateLimitDeath(other)).toBe(false)
})
