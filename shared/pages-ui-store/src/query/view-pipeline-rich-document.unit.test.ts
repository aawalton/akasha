import { describe, expect, test } from "bun:test"
import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import type { UseViewQueryOptions } from "../sql/options"
import { id, ROOT, row } from "./__fixtures__/view-pipeline-rows"
import { createViewPipeline } from "./view-pipeline"

const PERSONA_TYPE = "00000000-0000-7000-8000-0000000000b4"

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
  { id: "alanNotes", title: "Alan Notes", type: "rich-document", storage: "indexed" },
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

const EMPTY_DOC = { blocks: [] }
const BLANK_DOC = { blocks: [{ type: "paragraph", text: "" }] }
const REAL_DOC = { blocks: [{ type: "paragraph", text: "a real note" }] }

describe("view pipeline — #15044 indexed rich-document emptiness (late def arrival)", () => {
  test('isNotEmpty drops the {"blocks":[]} and blank rows, keeps only the real-notes row', async () => {
    const amy = persona(40, { alanNotes: EMPTY_DOC })
    const blank = persona(41, { alanNotes: BLANK_DOC })
    const real = persona(42, { alanNotes: REAL_DOC })
    const { ids, count } = await readIdsLateType([amy, blank, real], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "alanNotes", isNotEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(42)])
    expect(count).toBe(1)
  })

  test("isEmpty is the exact complement under the same late arrival", async () => {
    const amy = persona(40, { alanNotes: EMPTY_DOC })
    const blank = persona(41, { alanNotes: BLANK_DOC })
    const real = persona(42, { alanNotes: REAL_DOC })
    const { ids, count } = await readIdsLateType([amy, blank, real], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "alanNotes", isEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(40), id(41)])
    expect(count).toBe(2)
  })

  test("a persona with no alanNotes attribute at all reads as empty", async () => {
    const none = persona(50, {})
    const real = persona(51, { alanNotes: REAL_DOC })
    const { ids, count } = await readIdsLateType([none, real], personaTypeRow(), {
      pageTypeId: PERSONA_TYPE,
      filters: [{ key: "alanNotes", isEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(50)])
    expect(count).toBe(1)
  })
})
