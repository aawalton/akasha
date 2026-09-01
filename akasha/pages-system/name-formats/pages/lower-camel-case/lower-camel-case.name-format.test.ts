import { expect, test } from "bun:test"
import { lowerCamelCase } from "./lower-camel-case.name-format.code.ts"

test("words run together with every one but the first starting capital", () => {
  expect(lowerCamelCase("page")).toBe(true)
  expect(lowerCamelCase("pagePropertySlug")).toBe(true)
  expect(lowerCamelCase("runsOnPatch")).toBe(true)
})

test("a digit stands inside a word", () => {
  expect(lowerCamelCase("uuidVersion7")).toBe(true)
})

test("a first word opening capital is upper camel case, not this", () => {
  expect(lowerCamelCase("PagePropertySlug")).toBe(false)
})

test("a word may be one letter, so an acronym is let through either way it is written", () => {
  expect(lowerCamelCase("pageUuid")).toBe(true)
  expect(lowerCamelCase("pageUUID")).toBe(true)
})

test("anything between the words is not written in it", () => {
  expect(lowerCamelCase("")).toBe(false)
  expect(lowerCamelCase("page-property-slug")).toBe(false)
  expect(lowerCamelCase("page_property_slug")).toBe(false)
  expect(lowerCamelCase("page Property")).toBe(false)
})
