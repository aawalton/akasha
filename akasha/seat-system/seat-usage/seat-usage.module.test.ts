import { expect, test } from "bun:test"
import { usageIn } from "./seat-usage.module.code.ts"

test("a reading is taken from what the payload states", () => {
  expect(
    usageIn({ model: { id: "claude-opus-5" }, context_window: { total_input_tokens: 1234 } })
  ).toEqual({ model: "claude-opus-5", contextTokens: "1234" })
})

test("a number is kept as the text of that number", () => {
  expect(usageIn({ context_window: { total_input_tokens: 0 } }).contextTokens).toBe("0")
})

test("a value the payload does not state is no reading", () => {
  expect(usageIn({})).toEqual({ model: null, contextTokens: null })
  expect(usageIn(null)).toEqual({ model: null, contextTokens: null })
  expect(usageIn({ model: { id: "" } }).model).toBeNull()
})

test("a total that is not finite is no reading", () => {
  expect(usageIn({ context_window: { total_input_tokens: Number.NaN } }).contextTokens).toBeNull()
})
