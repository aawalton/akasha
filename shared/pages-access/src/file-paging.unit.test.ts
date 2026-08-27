import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { QueryRow } from "../../pages-query/src/answer-schema"
import type { Asked } from "../../pages-query/src/index"
import type { FileReadDeps, GetFilePagesArgs } from "./file-read"
import { forgetFilePageRuns, getFilePages } from "./file-read"
import type { PropertyDefinition } from "./page-type-config"
import type { PageCursor, PageOrder } from "./types"
import type { Page } from "@shared/pages-core/page-types"

const PAGE_TYPE_ID = "019db533-f381-7454-a6e4-fed5397cfd84"

const DEFINITIONS: readonly PropertyDefinition[] = [
  { id: "rank", title: "rank", type: "number", pageId: PAGE_TYPE_ID },
]

const SHAPE = { pageTypeId: PAGE_TYPE_ID, definitions: DEFINITIONS }

function population(howMany: number): readonly QueryRow[] {
  return Array.from({ length: howMany }, (_unused, at) => ({
    at: `instructions:things/thing-${String(at).padStart(6, "0")}.md`,
    values: {
      slug: `thing-${String(at).padStart(6, "0")}`,
      title: `Thing ${at}`,
      rank: String(howMany - at),
    },
  }))
}

function asking(rows: readonly QueryRow[]): FileReadDeps & { readonly asks: () => number } {
  let asks = 0
  return {
    asks: () => asks,
    ask: (_query: ComposedQuery): Promise<Asked> => {
      asks++
      return Promise.resolve({
        ok: true,
        answer: { n: rows.length, rows: [...rows], value: null, over: null },
      })
    },
    roster: () => Promise.resolve(new Set(["thing"])),
  }
}

function idOf(page: Page): string {
  const id = page.id
  if (typeof id !== "string") throw new Error("a page came back without an id")
  return id
}

type Swept = { readonly ids: readonly string[]; readonly pages: number; readonly asks: number }

async function sweep(
  rows: readonly QueryRow[],
  pageSize: number,
  order?: PageOrder,
  forgetBetweenPages = false
): Promise<Swept> {
  forgetFilePageRuns()
  const deps = asking(rows)
  const args: GetFilePagesArgs = { pageTypeSlug: "thing", shape: SHAPE, limit: pageSize, order }
  const ids: string[] = []
  let cursor: PageCursor | undefined
  let pages = 0
  const ceiling = Math.ceil(rows.length / pageSize) + 2
  while (pages <= ceiling) {
    const got = await getFilePages({ ...args, cursor }, deps)
    pages++
    for (const page of got.rows) ids.push(idOf(page))
    if (got.nextCursor === null) return { ids, pages, asks: deps.asks() }
    cursor = got.nextCursor
    if (forgetBetweenPages) forgetFilePageRuns()
  }
  throw new Error(`a sweep of ${rows.length} rows at page size ${pageSize} never reached the end`)
}

async function sweptWhole(rows: readonly QueryRow[], pageSize: number): Promise<Swept> {
  const swept = await sweep(rows, pageSize)
  expect({ pageSize, read: swept.ids.length }).toEqual({ pageSize, read: rows.length })
  expect({ pageSize, distinct: new Set(swept.ids).size }).toEqual({
    pageSize,
    distinct: rows.length,
  })
  return swept
}

describe("paging a file-backed page type", () => {
  it("yields every page of the type exactly once, whatever the page size", async () => {
    const rows = population(1573)
    for (const pageSize of [1, 7, 24, 200, 500, 1000, 5000]) {
      await sweptWhole(rows, pageSize)
    }
  })

  it("yields every page exactly once where the page size does not divide the population", async () => {
    await sweptWhole(population(10_945), 200)
    await sweptWhole(population(10_945), 333)
  })

  it("yields every page exactly once where the population is smaller than one page", async () => {
    const swept = await sweptWhole(population(3), 200)
    expect(swept.pages).toBe(1)
  })

  it("ends without losing a page where the population is exactly one page", async () => {
    const rows = population(24)
    const swept = await sweptWhole(rows, 24)
    expect(swept.pages).toBe(1)
    forgetFilePageRuns()
    const one = await getFilePages({ pageTypeSlug: "thing", shape: SHAPE, limit: 24 }, asking(rows))
    expect(one.rows.length).toBe(24)
    expect(one.nextCursor).toBeNull()
  })

  it("yields every page exactly once where the population is one row past a page", async () => {
    const swept = await sweptWhole(population(25), 24)
    expect(swept.pages).toBe(2)
  })

  it("yields an empty population as one empty page", async () => {
    const swept = await sweep([], 24)
    expect(swept.ids).toEqual([])
    expect(swept.pages).toBe(1)
  })

  it("yields every page exactly once under an order other than the default", async () => {
    const rows = population(500)
    for (const order of [
      [{ by: "rank", dir: "asc" as const }],
      [{ by: "rank", dir: "desc" as const }],
      [{ by: "title", dir: "desc" as const }],
    ]) {
      const swept = await sweep(rows, 33, order)
      expect(new Set(swept.ids).size).toBe(rows.length)
    }
  })

  it("holds one order across the whole sweep, whatever the page size", async () => {
    const rows = population(300)
    const order: PageOrder = [{ by: "rank", dir: "asc" }]
    const paged = await sweep(rows, 7, order)
    const whole = await sweep(rows, rows.length, order)
    expect(paged.ids).toEqual(whole.ids)
  })

  it("reads the population once for a whole sweep rather than once a page", async () => {
    const swept = await sweptWhole(population(10_000), 24)
    expect(swept.asks).toBe(1)
  })

  it("yields every page exactly once where nothing of the sweep is still held", async () => {
    const swept = await sweep(population(1000), 37, undefined, true)
    expect(swept.ids.length).toBe(1000)
    expect(new Set(swept.ids).size).toBe(1000)
    expect(swept.asks).toBe(swept.pages)
  })

  it("counts the whole population rather than the page it returned", async () => {
    forgetFilePageRuns()
    const got = await getFilePages(
      { pageTypeSlug: "thing", shape: SHAPE, limit: 200, withCount: true },
      asking(population(10_945))
    )
    expect(got.rows.length).toBe(200)
    expect(got.count).toBe(10_945)
    expect(got.nextCursor).not.toBeNull()
  })

  it("reaches every page by offset as it does by cursor", async () => {
    const rows = population(100)
    const deps = asking(rows)
    forgetFilePageRuns()
    const seen: string[] = []
    for (let offset = 0; offset < rows.length; offset += 30) {
      const got = await getFilePages(
        { pageTypeSlug: "thing", shape: SHAPE, limit: 30, offset },
        deps
      )
      for (const page of got.rows) seen.push(idOf(page))
    }
    expect(new Set(seen).size).toBe(rows.length)
  })
})
