import { expect, test } from "bun:test"
import { lowerSnakeCase } from "./lower-snake-case.name-format.code.ts"

test("words joined with underscores and all letters lower are written in it", () => {
  expect(lowerSnakeCase("page")).toBe(true)
  expect(lowerSnakeCase("lower_snake_case")).toBe(true)
  expect(lowerSnakeCase("uuid_version_7")).toBe(true)
})

test("a capital anywhere is not written in it", () => {
  expect(lowerSnakeCase("Lower_snake_case")).toBe(false)
  expect(lowerSnakeCase("LOWER_SNAKE_CASE")).toBe(false)
})

test("another joiner is not an underscore", () => {
  expect(lowerSnakeCase("lower-snake-case")).toBe(false)
  expect(lowerSnakeCase("lower snake case")).toBe(false)
})

test("an empty word is no word", () => {
  expect(lowerSnakeCase("")).toBe(false)
  expect(lowerSnakeCase("_page")).toBe(false)
  expect(lowerSnakeCase("page_")).toBe(false)
  expect(lowerSnakeCase("page__type")).toBe(false)
})
