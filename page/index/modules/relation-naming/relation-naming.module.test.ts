import { expect, test } from "bun:test"
import { shaped } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import {
  namingsIn,
  namingsInRows,
} from "akasha/page/index/modules/relation-naming/relation-naming.module.code.ts"

const KNOWN = shaped({})

test("a key whose property declares a target is answered, and a key whose property declares none is not", () => {
  expect(namingsIn({ partSlugs: ["b"], heldSlugs: "c" }, KNOWN)).toEqual([
    {
      key: "partSlugs",
      propertySlug: "part-slugs",
      said: "part-slugs",
      held: ["b"],
      identity: false,
    },
  ])
})

test("a key is held to the target its page's own property declares, not its slug's", () => {
  const known = { ...KNOWN, targetIn: () => null }

  expect(namingsIn({ partSlugs: ["b"] }, known)).toEqual([])
})

test("a record's fields are answered one by one under that record", () => {
  expect(namingsIn({ parts: [{ partSlugs: "b" }] }, KNOWN)).toEqual([
    {
      key: "partSlugs",
      propertySlug: "part-slugs",
      said: "parts part-slugs",
      held: "b",
      identity: false,
    },
  ])
})

test("a row's fields are answered under the entry shape the row is in", () => {
  expect(namingsInRows([{ slug: "cases", rows: [{ casePage: "c" }] }], KNOWN)).toEqual([
    {
      key: "casePage",
      propertySlug: "case-page",
      said: "cases case-page",
      held: "c",
      identity: false,
    },
  ])
})
