import { expect, test } from "bun:test"
import { counted } from "./passage-counting.module.code.ts"

test("a body holding the passage nowhere is answered with none", () => {
  expect(counted("held\n", "gone")).toBe(0)
})

test("a passage in a body once is counted once", () => {
  expect(counted("one held two\n", "held")).toBe(1)
})

test("a passage in a body twice is counted twice", () => {
  expect(counted("held and held\n", "held")).toBe(2)
})

test("a passage is matched as the characters that passage holds rather than as a pattern", () => {
  expect(counted("a.c and abc\n", "a.c")).toBe(1)
})

test("a second occurrence overlapping the first is passed over", () => {
  expect(counted("aaaa", "aa")).toBe(2)
})
