import { expect, test } from "bun:test"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { buildRawPageRows } from "akasha/page/access/modules/file-rows/file-rows.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { persona } from "akasha/persona/persona.page-type.ts"

const ADDRESS = `${pageType.slug}/${persona.slug}`

function typeOf(values: Record<string, unknown>): unknown {
  const rows = buildRawPageRows({
    rows: [{ values }],
    definitions: [],
    pageTypeId: persona.id,
    pageTypeSlug: persona.slug,
  })
  const held = rows[0]?.attributes
  return isRecord(held) ? held.type : null
}

test("a row states its own page type as an address, so a badge reads that type's name", () => {
  expect(typeOf({ id: "1", slug: "olwen" })).toBe(ADDRESS)
})

test("a value naming a page type is answered by the row rather than by that value", () => {
  expect(typeOf({ id: "1", slug: "olwen", type: "seat" })).toBe(ADDRESS)
})
