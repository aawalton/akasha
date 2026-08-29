import { expect, test } from "bun:test"
import { upperCamelCase } from "./upper-camel-case.name-format.code.ts"

test("words run together with every one starting capital", () => {
  expect(upperCamelCase("Page")).toBe(true)
  expect(upperCamelCase("PagePropertySlug")).toBe(true)
})

test("a digit stands inside a word", () => {
  expect(upperCamelCase("UuidVersion7")).toBe(true)
})

test("a first word opening lower is lower camel case, not this", () => {
  expect(upperCamelCase("pagePropertySlug")).toBe(false)
})

test("a word may be one letter, so an acronym is let through either way it is written", () => {
  expect(upperCamelCase("PageUuid")).toBe(true)
  expect(upperCamelCase("PageUUID")).toBe(true)
})

test("anything between the words is not written in it", () => {
  expect(upperCamelCase("")).toBe(false)
  expect(upperCamelCase("Page-Property")).toBe(false)
  expect(upperCamelCase("Page_Property")).toBe(false)
  expect(upperCamelCase("Page Property")).toBe(false)
})
