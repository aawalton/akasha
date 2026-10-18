import { expect, test } from "bun:test"
import { nudged } from "akasha/alan/collection/great-courses/modules/lecture-watching/lecture-watching.module.code.ts"

test("a nudge moves the speed a quarter", () => {
  expect(nudged(3, 0.25)).toBe(3.25)
  expect(nudged(3, -0.25)).toBe(2.75)
})

test("the speed is never nudged past four", () => {
  expect(nudged(4, 0.25)).toBe(4)
})

test("the speed is never nudged under a half", () => {
  expect(nudged(0.5, -0.25)).toBe(0.5)
})

test("a speed off the quarters is nudged onto them", () => {
  expect(nudged(1.1, 0.25)).toBe(1.25)
})
