import { expect, test } from "bun:test"
import { insertedInto } from "./value-inserting.module.code.ts"

const AT = "akasha/one.thing.ts"

const BODY =
  'import type { Thing } from "./thing.page-type.ts"\n\n' +
  'export const one = { pageTypeSlug: "thing", slug: "one" } as const satisfies Thing\n'

test("a value goes in first in the literal, and the rest of the body is unchanged", () => {
  const said = insertedInto(AT, BODY, "id", '"held"') ?? ""
  expect(said).toContain('{ id: "held", pageTypeSlug: "thing"')
  expect(said.split("\n").length).toBe(BODY.split("\n").length)
})

test("a body declaring no literal takes no value", () => {
  expect(insertedInto(AT, "export const one = 1\n", "id", '"held"')).toBe(null)
})
