import { expect, test } from "bun:test"
import { lowerKebabCase } from "./lower-kebab-case.name-format.code.ts"

test("words joined with hyphens and all letters lower are written in it", () => {
  expect(lowerKebabCase("page")).toBe(true)
  expect(lowerKebabCase("lower-kebab-case")).toBe(true)
})

test("a digit stands inside a word", () => {
  expect(lowerKebabCase("id-is-a-uuid-version-7")).toBe(true)
})

test("a capital anywhere is not written in it", () => {
  expect(lowerKebabCase("Lower-kebab-case")).toBe(false)
  expect(lowerKebabCase("lowerKebabCase")).toBe(false)
})

test("another joiner is not a hyphen", () => {
  expect(lowerKebabCase("lower_kebab_case")).toBe(false)
  expect(lowerKebabCase("lower kebab case")).toBe(false)
})

test("an empty word is no word", () => {
  expect(lowerKebabCase("")).toBe(false)
  expect(lowerKebabCase("-page")).toBe(false)
  expect(lowerKebabCase("page-")).toBe(false)
  expect(lowerKebabCase("page--type")).toBe(false)
})
