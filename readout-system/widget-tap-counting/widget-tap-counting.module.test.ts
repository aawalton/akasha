import { expect, test } from "bun:test"
import { tapsOn } from "./widget-tap-counting.module.code.ts"

test("a widget carrying no count has taken no tap", () => {
  expect(tapsOn({ slug: "alanwalton-surplus" })).toBe(0)
  expect(tapsOn({ slug: "alanwalton-surplus", taps: null })).toBe(0)
})

test("the count a widget carries is the count read back", () => {
  expect(tapsOn({ slug: "alanwalton-surplus", taps: 19 })).toBe(19)
})

test("a count of no taps is a count rather than an absent one", () => {
  expect(tapsOn({ slug: "alanwalton-surplus", taps: 0 })).toBe(0)
})

test("a count that is no number is refused rather than read as no tap", () => {
  expect(() => tapsOn({ slug: "alanwalton-surplus", taps: "many" })).toThrow()
})

test("a refusal names the widget carrying the count", () => {
  expect(() => tapsOn({ slug: "alanwalton-surplus", taps: "many" })).toThrow(/alanwalton-surplus/)
})
