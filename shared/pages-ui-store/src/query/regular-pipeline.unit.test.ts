import { describe, expect, test } from "bun:test"
import { asPageRow, type PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import type { UsePagesOptions } from "../sql/options"
import { createRegularPipeline } from "./regular-pipeline"

function uuid(i: number): string {
  return `00000000-0000-7000-8000-${i.toString(16).padStart(12, "0")}`
}

interface Spec {
  readonly i: number
  readonly slug?: string
  readonly seq: number
  readonly title?: string | null
  readonly status?: string | null
  readonly attrs?: Record<string, unknown>
}

function mk(spec: Spec): PageRow {
  const row = {
    id: uuid(spec.i),
    page_type_id: "00000000-0000-7000-8000-0000000000aa",
    user_id: "test",
    seq: spec.seq,
    title: spec.title ?? null,
    icon: null,
    attributes: spec.attrs ?? {},
    page_type_slug: spec.slug ?? "type-a",
    unique_key: null,
    status: spec.status ?? null,
    completed_at: null,
    slug: null,
    parent_key: null,
  }
  return asPageRow(row)
}

const CORPUS: readonly PageRow[] = [
  mk({
    i: 1,
    seq: 5,
    title: "banana",
    status: "open",
    attrs: { priority: 3, tags: ["x", "y"], label: "hello" },
  }),
  mk({ i: 2, seq: 2, title: "apple", status: "done", attrs: { priority: 7, tags: [], label: "" } }),
  mk({ i: 3, seq: 9, title: null, status: "open", attrs: { priority: 3, assignee: "u1" } }),
  mk({ i: 5, slug: "type-b", seq: 1, title: "other", status: "open", attrs: { priority: 3 } }),
  mk({ i: 6, seq: 2, title: "apple", status: "open", attrs: { priority: 1 } }),
]

async function run(options: UsePagesOptions): Promise<{ ids: readonly string[]; count: number }> {
  const handle = createPagesCollection()
  await handle.collection.preload()
  handle.controller.seed(CORPUS)
  const pipeline = createRegularPipeline(handle.collection, options)
  try {
    const r = pipeline.read()
    return { ids: r.rows.map((row) => row.id), count: r.totalCount }
  } finally {
    pipeline.dispose()
    handle.cleanup()
  }
}

describe("regular pipeline — durable behaviours", () => {
  test("eq on a promoted column (title), default seq-asc + id tiebreak", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "title", eq: "apple" }] })
    expect(r.ids).toEqual([uuid(2), uuid(6)])
    expect(r.count).toBe(2)
  })

  test("eq on an attribute (priority)", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "priority", eq: 3 }] })
    expect(r.ids).toEqual([uuid(1), uuid(3)])
    expect(r.count).toBe(2)
  })

  test("in on an attribute", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "priority", in: [1, 7] }] })
    expect(r.ids).toEqual([uuid(2), uuid(6)])
    expect(r.count).toBe(2)
  })

  test("notIn on an attribute (null/absent excluded from the exclusion set match)", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "priority", notIn: [3] }] })
    expect(r.ids).toEqual([uuid(2), uuid(6)])
    expect(r.count).toBe(2)
  })

  test("isEmpty on an attribute (materialized residue: null / '' / absent)", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "label", isEmpty: true }] })
    expect(r.ids).toEqual([uuid(2), uuid(6), uuid(3)])
    expect(r.count).toBe(3)
  })

  test("or folds two attribute equalities", async () => {
    const r = await run({
      pageTypeSlug: "type-a",
      where: [
        {
          or: [
            { key: "priority", eq: 7 },
            { key: "priority", eq: 1 },
          ],
        },
      ],
    })
    expect(r.ids).toEqual([uuid(2), uuid(6)])
    expect(r.count).toBe(2)
  })

  test("ordering: explicit seq-asc with id tiebreak across equal seqs", async () => {
    const r = await run({ pageTypeSlug: "type-a", order: [{ by: "seq", dir: "asc" }] })
    expect(r.ids).toEqual([uuid(2), uuid(6), uuid(1), uuid(3)])
    expect(r.count).toBe(4)
  })

  test("ordering: a null sorts first ascending, matching the file read path", async () => {
    const r = await run({ pageTypeSlug: "type-a", order: [{ by: "title", dir: "asc" }] })
    expect(r.ids).toEqual([uuid(3), uuid(2), uuid(6), uuid(1)])
    expect(r.count).toBe(4)
  })

  test("ordering: a null sorts last descending", async () => {
    const r = await run({ pageTypeSlug: "type-a", order: [{ by: "title", dir: "desc" }] })
    expect(r.ids).toEqual([uuid(1), uuid(2), uuid(6), uuid(3)])
    expect(r.count).toBe(4)
  })

  test("totalCount is the full filtered size, independent of limit", async () => {
    const r = await run({ pageTypeSlug: "type-a", order: [{ by: "seq", dir: "asc" }], limit: 2 })
    expect(r.ids).toEqual([uuid(2), uuid(6)])
    expect(r.count).toBe(4)
  })

  test("isNull on a promoted column (title)", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "title", isNull: true }] })
    expect(r.ids).toEqual([uuid(3)])
    expect(r.count).toBe(1)
  })

  test("neq on a promoted column (IS DISTINCT FROM includes the null-title row)", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "title", neq: "apple" }] })
    expect(r.ids).toEqual([uuid(1), uuid(3)])
    expect(r.count).toBe(2)
  })

  test("includes matches array membership in an attribute", async () => {
    const r = await run({ pageTypeSlug: "type-a", where: [{ key: "tags", includes: "x" }] })
    expect(r.ids).toEqual([uuid(1)])
    expect(r.count).toBe(1)
  })
})

async function runOn(
  corpus: readonly PageRow[],
  options: UsePagesOptions
): Promise<{ ids: readonly string[]; count: number }> {
  const handle = createPagesCollection()
  await handle.collection.preload()
  handle.controller.seed(corpus)
  const pipeline = createRegularPipeline(handle.collection, options)
  try {
    const r = pipeline.read()
    return { ids: r.rows.map((row) => row.id), count: r.totalCount }
  } finally {
    pipeline.dispose()
    handle.cleanup()
  }
}

const CONTENT_CORPUS: readonly PageRow[] = [
  mk({ i: 10, seq: 10, title: "abby", attrs: { nonEmptyContentKeys: ["alanNotes"] } }),
  mk({ i: 11, seq: 11, title: "aria", attrs: { nonEmptyContentKeys: ["alanNotes"] } }),
  mk({ i: 12, seq: 12, title: "ali", attrs: {} }),
  mk({ i: 13, seq: 13, title: "mari", attrs: { nonEmptyContentKeys: ["backstory"] } }),
]

describe("regular pipeline — content-tier isEmpty/isNotEmpty (#14713 grouped path)", () => {
  test("isNotEmpty on a content-tier key matches only rows in nonEmptyContentKeys", async () => {
    const r = await runOn(CONTENT_CORPUS, {
      pageTypeSlug: "type-a",
      where: [{ key: "alanNotes", isNotEmpty: true }],
    })
    expect(r.ids).toEqual([uuid(10), uuid(11)])
    expect(r.count).toBe(2)
  })

  test("isEmpty on a content-tier key matches the complement (Ali + other-key rows)", async () => {
    const r = await runOn(CONTENT_CORPUS, {
      pageTypeSlug: "type-a",
      where: [{ key: "alanNotes", isEmpty: true }],
    })
    expect(r.ids).toEqual([uuid(12), uuid(13)])
    expect(r.count).toBe(2)
  })
})
