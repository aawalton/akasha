import { expect, test } from "bun:test"
import {
  nudged,
  progressIn,
} from "akasha/alan/collection/great-courses/modules/lecture-watching/lecture-watching.module.code.ts"

const ANSWER = { watching: true, speed: 3, next: null, why: null, progress: 12.5 }

test("a course's progress is taken from its page", () => {
  expect(progressIn(ANSWER)).toBe(12.5)
})

test("a course with no page gives no progress", () => {
  expect(() => progressIn({ ...ANSWER, progress: null })).toThrow("akasha holds no page")
})

test("a page that could not be read gives no progress", () => {
  expect(() => progressIn({ ...ANSWER, why: "sign in" })).toThrow("sign in")
})

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
