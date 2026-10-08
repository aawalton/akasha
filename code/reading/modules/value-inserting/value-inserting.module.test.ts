import { expect, test } from "bun:test"
import {
  insertedInto,
  replacedIn,
} from "akasha/code/reading/modules/value-inserting/value-inserting.module.code.ts"

const AT = "akasha/one.thing.ts"

const BODY =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  'export const one = { type: "page-type/thing", slug: "one" } as const satisfies Thing\n'

test("a value goes in first in the literal, and the rest of the body is unchanged", () => {
  const said = insertedInto(AT, BODY, "id", '"held"') ?? ""
  expect(said).toContain('{ id: "held", type: "page-type/thing"')
  expect(said.split("\n").length).toBe(BODY.split("\n").length)
})

test("a body declaring no literal takes no value", () => {
  expect(insertedInto(AT, "export const one = 1\n", "id", '"held"')).toBe(null)
})

test("a value placed last goes in after the last value the literal has", () => {
  const said = insertedInto(AT, BODY, "updatedAt", '"held"', "last") ?? ""
  expect(said).toContain('{ type: "page-type/thing", slug: "one", updatedAt: "held" }')
  expect(said.split("\n").length).toBe(BODY.split("\n").length)
})

test("a value placed last in an empty literal is the only value", () => {
  expect(insertedInto(AT, "export const one = {}\n", "updatedAt", '"held"', "last")).toBe(
    'export const one = {updatedAt: "held", }\n'
  )
})

test("a value replaced is the value its key holds, and the rest of the body is unchanged", () => {
  expect(replacedIn(AT, BODY, "slug", '"two"')).toBe(BODY.replace('"one"', '"two"'))
})

test("a key the literal does not hold is replaced nowhere", () => {
  expect(replacedIn(AT, BODY, "updatedAt", '"held"')).toBe(null)
  expect(replacedIn(AT, "export const one = 1\n", "slug", '"held"')).toBe(null)
})
