import { describe, expect, test } from "bun:test"
import { NON_EMPTY_CONTENT_KEYS_ATTR } from "@shared/pages-core/schema/content-tier"
import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import type { UseViewQueryOptions } from "../sql/options"
import { id, ROOT, row } from "./__fixtures__/view-pipeline-rows"
import { createViewPipeline } from "./view-pipeline"

const PERSONA_TYPE = "00000000-0000-7000-8000-0000000000a3"

async function readIdsLateType(
  dataRows: readonly PageRow[],
  typeRow: PageRow,
  options: UseViewQueryOptions
): Promise<{ ids: string[]; count: number }> {
  const handle = createPagesCollection()
  try {
    await handle.collection.preload()
    handle.controller.seed(dataRows)
    const pipe = createViewPipeline(handle.collection, options)
    try {
      handle.controller.seed([typeRow])
      const res = pipe.read()
      return { ids: res.rows.map((r) => r.id), count: res.totalCount }
    } finally {
      pipe.dispose()
    }
  } finally {
    handle.cleanup()
  }
}

const PERSONA_DEFS = [
  { id: "alanNotes", title: "Alan Notes", type: "rich-document", storage: "content" },
  { id: "lastSeen", title: "Last Seen", type: "instant" },
]

function personaTypeRow(): PageRow {
  return row({
    id: PERSONA_TYPE,
    pageTypeId: ROOT,
    slug: "page-type",
    title: "Persona",
    attributes: { slug: "persona", propertyDefinitions: PERSONA_DEFS },
  })
}

function persona(n: number, attributes: Readonly<Record<string, unknown>>): PageRow {
  return row({ id: id(n), pageTypeId: PERSONA_TYPE, slug: "persona", seq: n, attributes })
}

describe("view pipeline — #14713 late def arrival", () => {
  test("content-tier isNotEmpty passes ONLY the presence-bit row after the def row streams in late", async () => {
    const withNotes = persona(20, { [NON_EMPTY_CONTENT_KEYS_ATTR]: ["alanNotes"] })
    const without = persona(21, { [NON_EMPTY_CONTENT_KEYS_ATTR]: [] })
    const { ids, count } = await readIdsLateType([withNotes, without], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "alanNotes", isNotEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(20)])
    expect(count).toBe(1)
  })

  test("content-tier isEmpty is the exact complement under the same late arrival", async () => {
    const withNotes = persona(20, { [NON_EMPTY_CONTENT_KEYS_ATTR]: ["alanNotes"] })
    const without = persona(21, { [NON_EMPTY_CONTENT_KEYS_ATTR]: [] })
    const { ids, count } = await readIdsLateType([withNotes, without], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "alanNotes", isEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(21)])
    expect(count).toBe(1)
  })

  test("instant FILTER resolves after the def row streams in late (same freeze class)", async () => {
    const threshold = Date.parse("2020-02-01T00:00:00.000Z")
    const recent = persona(30, { lastSeen: "2020-03-01T00:00:00.000Z" })
    const stale = persona(31, { lastSeen: "2020-01-01T00:00:00.000Z" })
    const { ids, count } = await readIdsLateType([recent, stale], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "lastSeen", gt: threshold }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(30)])
    expect(count).toBe(1)
  })
})
