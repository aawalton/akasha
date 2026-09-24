import { expect, test } from "bun:test"
import {
  computeEvictableIds,
  parseContentPageIndex,
  parsePersistedContentPage,
  serializeContentPage,
} from "akasha/alan/web/modules/content-pages-cache-core/content-pages-cache-core.module.code.ts"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

const PAGE_ID = "01a0655d-daa6-7fdf-b1e7-000000000001"

const BODY = "The innkeeper set the mug down and looked out at the empty road."

test("a page held in the cache reads back with every key it was held with", () => {
  const held = asPage({ id: PAGE_ID, title: "Chapter 1.00", body: BODY, ownLength: BODY.length })
  const readBack = parsePersistedContentPage(serializeContentPage(held))
  expect(readBack).toEqual(held)
})

test("a held page naming only its id reads back", () => {
  expect(parsePersistedContentPage(JSON.stringify({ id: PAGE_ID }))?.id).toBe(PAGE_ID)
})

test("a held page with no id reads back as nothing", () => {
  expect(parsePersistedContentPage(JSON.stringify({ title: "Chapter 1.00" }))).toBeNull()
})

test("an index held with pins reads back with its ids, and every id can be evicted", () => {
  const index = parseContentPageIndex(
    JSON.stringify({ version: 1, ids: [PAGE_ID], pinnedIds: [PAGE_ID], recency: [] })
  )
  expect(index.ids).toEqual([PAGE_ID])
  expect(computeEvictableIds(index, 0)).toEqual([PAGE_ID])
})
