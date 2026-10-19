import { expect, test } from "bun:test"
import {
  nudged,
  progressIn,
  scaled,
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

test("a speed is doubled or halved", () => {
  expect(scaled(1.5, 2)).toBe(3)
  expect(scaled(3, 0.5)).toBe(1.5)
})

test("a doubled speed stops at four and a halved one at a half", () => {
  expect(scaled(3, 2)).toBe(4)
  expect(scaled(0.75, 0.5)).toBe(0.5)
})

test("a halved speed lands on the quarters", () => {
  expect(scaled(2.75, 0.5)).toBe(1.5)
})
