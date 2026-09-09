import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code/code-source"
import type { Splice } from "../answer/change-answer.module.types.ts"
import { listIn, literalIn } from "../page-literal/page-literal.module.code.ts"
import { without, withProperty, withValue } from "./literal-splicing.module.code.ts"

const AT = "one/held.module.ts"

const BODY = [
  'import type { Module } from "@akasha/code/module"',
  "",
  "export const held = {",
  '  slug: "held",',
  '  definition: "a page an edit falls in",',
  '  partSlugs: ["module/one", "module/two"],',
  "} as const satisfies Module",
  "",
].join("\n")

const LINES = [
  "export const held = {",
  "  partSlugs: [",
  '    "module/one",',
  '    "module/two",',
  '    "module/three",',
  "  ],",
  "} as const satisfies Module",
  "",
].join("\n")

const ONE = [
  "export const held = {",
  "  partSlugs: [",
  '    "module/one",',
  "  ],",
  "} as const satisfies Module",
  "",
].join("\n")

const ONE_EMPTIED = [
  "export const held = {",
  "  partSlugs: [],",
  "} as const satisfies Module",
  "",
].join("\n")

const EMPTY = ["export const held = {", "  partSlugs: [],", "} as const satisfies Module", ""].join(
  "\n"
)

const BARE = ["export const held = {} as const satisfies Module", ""].join("\n")

const BARE_GAINED = [
  "export const held = {",
  '  slug: "held",',
  "} as const satisfies Module",
  "",
].join("\n")

const DEEP = ["export const held = {", '    slug: "held",', "} as const satisfies Module", ""].join(
  "\n"
)

const DEEP_GAINED = [
  "export const held = {",
  '    slug: "held",',
  '    pluralSlug: "helds",',
  "} as const satisfies Module",
  "",
].join("\n")

function splicedInto(text: string, one: Splice): string {
  return text.slice(0, one.from) + one.put + text.slice(one.to)
}

function valuePut(text: string, key: string, value: string): string {
  const source = parsedAs(AT, text)
  const list = listIn(source, key)
  return list === null ? "" : splicedInto(text, withValue(source, list, value))
}

function propertyPut(text: string, put: string, after: string | undefined): string {
  const source = parsedAs(AT, text)
  const owner = literalIn(source)
  return owner === null ? "" : splicedInto(text, withProperty(text, source, owner, put, after))
}

function valueGone(text: string, key: string, at: number): string {
  const source = parsedAs(AT, text)
  const list = listIn(source, key)
  return list === null ? "" : splicedInto(text, without(text, source, list, list.elements, at))
}

function propertyGone(text: string, at: number): string {
  const source = parsedAs(AT, text)
  const owner = literalIn(source)
  return owner === null ? "" : splicedInto(text, without(text, source, owner, owner.properties, at))
}

test("a value put into a list already holding values falls after the last of them", () => {
  expect(valuePut(BODY, "partSlugs", "module/three")).toBe(
    BODY.replace('"module/two"]', '"module/two", "module/three"]')
  )
})

test("a value put into a list holding none falls just inside the bracket", () => {
  expect(valuePut(EMPTY, "partSlugs", "module/one")).toContain('partSlugs: ["module/one"],')
})

test("a value is written as JSON spells it", () => {
  expect(valuePut(BODY, "partSlugs", 'a "quoted" one')).toContain('"a \\"quoted\\" one"')
})

test("an entry put into an object falls after the entry `after` names", () => {
  expect(propertyPut(BODY, 'pluralSlug: "helds"', "slug")).toBe(
    BODY.replace('  slug: "held",\n', '  slug: "held",\n  pluralSlug: "helds",\n')
  )
})

test("an entry falls after the last entry where `after` names none of them", () => {
  expect(propertyPut(BODY, 'pluralSlug: "helds"', "definition-of-none")).toBe(
    BODY.replace('"module/two"],\n', '"module/two"],\n  pluralSlug: "helds",\n')
  )
})

test("an entry falls after the last entry where no `after` is handed in", () => {
  expect(propertyPut(BODY, 'pluralSlug: "helds"', undefined)).toBe(
    BODY.replace('"module/two"],\n', '"module/two"],\n  pluralSlug: "helds",\n')
  )
})

test("an entry written after another takes the indent that entry carries", () => {
  expect(propertyPut(DEEP, 'pluralSlug: "helds"', "slug")).toBe(DEEP_GAINED)
})

test("an entry put into an object holding none falls just inside the brace", () => {
  expect(propertyPut(BARE, 'slug: "held"', undefined)).toBe(BARE_GAINED)
})

test("an entry with a comma after it goes with that comma and with the space before it", () => {
  expect(valueGone(LINES, "partSlugs", 1)).toBe(LINES.replace('    "module/two",\n', ""))
})

test("the last entry goes on its own where a comma follows it too", () => {
  expect(valueGone(LINES, "partSlugs", 2)).toBe(LINES.replace('    "module/three",\n', ""))
})

test("an entry with no comma after it goes back to where the entry before it ended", () => {
  expect(valueGone(BODY, "partSlugs", 1)).toBe(BODY.replace(', "module/two"', ""))
})

test("the one entry a literal holds goes with everything between its delimiters", () => {
  expect(valueGone(ONE, "partSlugs", 0)).toBe(ONE_EMPTIED)
})

test("an index naming no entry answers a span holding nothing", () => {
  expect(valueGone(BODY, "partSlugs", 9)).toBe(BODY)
})

test("an entry goes out of an object as one goes out of a list", () => {
  expect(propertyGone(BODY, 1)).toBe(BODY.replace('  definition: "a page an edit falls in",\n', ""))
})
