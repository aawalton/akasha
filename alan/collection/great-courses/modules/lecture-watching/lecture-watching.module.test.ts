import { expect, test } from "bun:test"
import {
  courseFrom,
  nudged,
} from "akasha/alan/collection/great-courses/modules/lecture-watching/lecture-watching.module.code.ts"

test("a page naming no course has its course read off a lecture's id", () => {
  expect(courseFrom(undefined, "ZV8500-L01")).toBe("8500")
})

test("a page naming its course is taken at its word", () => {
  expect(courseFrom("1382", "ZV8500-L01")).toBe("1382")
})

test("a lecture id naming no course gives none", () => {
  expect(courseFrom(undefined, "intro")).toBeNull()
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
