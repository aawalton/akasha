import { describe, expect, test } from "bun:test"
import { asPageRow, type PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import { createIdSuffixPipeline } from "./id-suffix-pipeline"
import { createRegularPipeline } from "./regular-pipeline"

function uuid(i: number): string {
  return `00000000-0000-7000-8000-${i.toString(16).padStart(12, "0")}`
}

function suffixOf(i: number): string {
  return uuid(i).slice(-8)
}

function mk(i: number, seq: number, slug = "story-chapter"): PageRow {
  return asPageRow({
    id: uuid(i),
    page_type_id: "00000000-0000-7000-8000-0000000000aa",
    user_id: "test",
    seq,
    title: `chapter ${i}`,
    icon: null,
    attributes: {},
    page_type_slug: slug,
    unique_key: null,
    status: null,
    completed_at: null,
    slug: null,
    parent_key: null,
  })
}

const BIG_CORPUS: readonly PageRow[] = Array.from({ length: 1200 }, (_, k) => mk(k + 1, k + 1))
const TARGET_I = 1150
const TARGET_SUFFIX = suffixOf(TARGET_I)

async function seeded(rows: readonly PageRow[]): Promise<ReturnType<typeof createPagesCollection>> {
  const handle = createPagesCollection()
  await handle.collection.preload()
  handle.controller.seed(rows)
  return handle
}

describe("id-suffix pipeline — full-mirror point lookup (#15612)", () => {
  test("finds a slug row beyond the 1000-row seq-window (the regression)", async () => {
    const handle = await seeded(BIG_CORPUS)
    const pipeline = createIdSuffixPipeline(handle.collection, {
      pageTypeSlug: "story-chapter",
      idSuffix: TARGET_SUFFIX,
    })
    try {
      const rows = pipeline.read().rows
      expect(rows.map((r) => r.id)).toEqual([uuid(TARGET_I)])
    } finally {
      pipeline.dispose()
      handle.cleanup()
    }
  })

  test("REGRESSION WITNESS: the list pipeline windows that same row OUT", async () => {
    const handle = await seeded(BIG_CORPUS)
    const pipeline = createRegularPipeline(handle.collection, { pageTypeSlug: "story-chapter" })
    try {
      const rows = pipeline.read().rows
      expect(rows).toHaveLength(1000)
      expect(rows.some((r) => r.id.slice(-8) === TARGET_SUFFIX)).toBe(false)
    } finally {
      pipeline.dispose()
      handle.cleanup()
    }
  })

  test("returns [] for a suffix present on no resident row", async () => {
    const handle = await seeded(BIG_CORPUS)
    const pipeline = createIdSuffixPipeline(handle.collection, {
      pageTypeSlug: "story-chapter",
      idSuffix: suffixOf(999999),
    })
    try {
      expect(pipeline.read().rows).toEqual([])
    } finally {
      pipeline.dispose()
      handle.cleanup()
    }
  })

  test("is scoped to the slug — the same row is invisible under a different slug scope", async () => {
    const handle = await seeded([mk(42, 1, "story-chapter")])
    const inScope = createIdSuffixPipeline(handle.collection, {
      pageTypeSlug: "story-chapter",
      idSuffix: suffixOf(42),
    })
    const otherScope = createIdSuffixPipeline(handle.collection, {
      pageTypeSlug: "temper-task",
      idSuffix: suffixOf(42),
    })
    try {
      expect(inScope.read().rows.map((r) => r.id)).toEqual([uuid(42)])
      expect(otherScope.read().rows).toEqual([])
    } finally {
      inScope.dispose()
      otherScope.dispose()
      handle.cleanup()
    }
  })
})
