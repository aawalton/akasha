import { expect, test } from "bun:test"
import { matching } from "./name-matching.module.code.ts"

const LETTERS = matching(/^[a-z]+$/)

test("a name the shape covers whole is written in it, and one it does not is not", () => {
  expect(LETTERS("abc")).toBe(true)
  expect(LETTERS("aBc")).toBe(false)
})

test("an empty name is answered rather than passed over", () => {
  expect(LETTERS("")).toBe(false)
})

test("two shapes make two matchers, and neither answers for the other", () => {
  expect(matching(/^a$/)("a")).toBe(true)
  expect(matching(/^b$/)("a")).toBe(false)
})

test("a matcher asked twice answers the same, holding no place between calls", () => {
  expect(LETTERS("abc")).toBe(true)
  expect(LETTERS("abc")).toBe(true)
})
