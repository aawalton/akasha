import { expect, test } from "bun:test"
import { upperSnakeCase } from "./upper-snake-case.name-format.code.ts"

test("words joined with underscores and all letters capital are written in it", () => {
  expect(upperSnakeCase("PAGE")).toBe(true)
  expect(upperSnakeCase("UPPER_SNAKE_CASE")).toBe(true)
  expect(upperSnakeCase("UUID_VERSION_7")).toBe(true)
})

test("a lower letter anywhere is not written in it", () => {
  expect(upperSnakeCase("Upper_snake_case")).toBe(false)
  expect(upperSnakeCase("upper_snake_case")).toBe(false)
})

test("another joiner is not an underscore", () => {
  expect(upperSnakeCase("UPPER-SNAKE-CASE")).toBe(false)
  expect(upperSnakeCase("UPPER SNAKE CASE")).toBe(false)
})

test("an empty word is no word", () => {
  expect(upperSnakeCase("")).toBe(false)
  expect(upperSnakeCase("_PAGE")).toBe(false)
  expect(upperSnakeCase("PAGE_")).toBe(false)
  expect(upperSnakeCase("PAGE__TYPE")).toBe(false)
})
