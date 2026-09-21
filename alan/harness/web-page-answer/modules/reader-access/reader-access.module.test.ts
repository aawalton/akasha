import { expect, test } from "bun:test"
import {
  narrowedWrite,
  personOf,
} from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { ANONYMOUS_PERSON } from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

test("a reader no session names is the reader nobody signed in as", async () => {
  expect(await personOf(null)).toBe(ANONYMOUS_PERSON)
})

test("a reader carrying no contributor is read the same way", async () => {
  expect(await personOf({})).toBe(ANONYMOUS_PERSON)
  expect(await personOf({ contributor: "" })).toBe(ANONYMOUS_PERSON)
})

test("a narrowed access lets its holder read and never write", () => {
  expect(narrowedWrite({ permitted: true, narrows: null })).toBeNull()
  const why = narrowedWrite({
    permitted: true,
    narrows: [{ key: "standing", is: "published" }],
  })
  expect(why).toContain("carries a narrow")
})
