import { afterAll, describe, expect, mock, test } from "bun:test"
import type { SequenceConfig } from "@shared/pages-core/schema/sequence-config"
import type { Json } from "../../supabase-database/src/generated/database"
import { pageId } from "./_client-test-helpers"
import { decodeCursor, encodeCursor } from "./cursor"
import type { GetPagesArgs, GetPagesResult } from "./get"
import * as realGet from "./get"
import * as realConfig from "./page-type-config"
import { applySelect } from "./routing-core"
import { type PageCursor } from "./types"
import { Page } from "@shared/pages-core/page-types"

const BACKEND_DEFAULT_LIMIT = 1000

const CONFIG: SequenceConfig = { groupBy: "story", orderBy: "chapterNumber", direction: "asc" }

type Backend = { readonly reads: () => number; readonly widest: () => number }

const realGetPage = realGet.getPage
const realGetPageByIdSuffix = realGet.getPageByIdSuffix
const realGetPageByIdSuffixAcrossTypes = realGet.getPageByIdSuffixAcrossTypes
const realGetPages = realGet.getPages
const realShapelessWhy = realGet.shapelessWhy
const realUnfiledWhy = realGet.unfiledWhy

const realAsPropertyDefinitionList = realConfig.asPropertyDefinitionList
const realDetailConfigSlug = realConfig.detailConfigSlug
const realGetMediaConfig = realConfig.getMediaConfig
const realGetPropertyDefinitions = realConfig.getPropertyDefinitions
const realGetSequenceConfig = realConfig.getSequenceConfig

let currentGetPages: typeof realGetPages = realGetPages
let currentGetSequenceConfig: typeof realGetSequenceConfig = realGetSequenceConfig
let currentConfig: SequenceConfig | null = CONFIG
let bound = false

afterAll(() => {
  currentGetPages = realGetPages
  currentGetSequenceConfig = realGetSequenceConfig
  currentConfig = CONFIG
})

const FIXTURE_USER_ID = "019eb8cb-0098-722b-8580-9fd4e057b0a1"
const FIXTURE_PAGE_TYPE_ID = "019eb8cb-0098-722b-8580-9fd4e057b0a2"

function fixturePage(over: Readonly<Record<string, Json>>): Page {
  return Page({
    id: "",
    seq: null,
    title: null,
    icon: null,
    slug: null,
    userId: FIXTURE_USER_ID,
    pageTypeId: FIXTURE_PAGE_TYPE_ID,
    pageTypeSlug: "story-chapter",
    uniqueKey: null,
    ...over,
  })
}

function chapters(howMany: number, story: string): readonly Page[] {
  return Array.from({ length: howMany }, (_unused, at) => {
    const named = `${story}-chapter-${String(at).padStart(6, "0")}`
    return fixturePage({
      id: named,
      slug: named,
      title: `Chapter ${at}`,
      story,
      chapterNumber: at,
    })
  })
}

function install(population: readonly Page[]): Backend {
  let reads = 0
  let widest = 0
  currentGetPages = (args: GetPagesArgs): Promise<GetPagesResult> => {
    reads++
    const limit = args.limit ?? BACKEND_DEFAULT_LIMIT
    widest = Math.max(widest, limit)
    const group = args.where?.find((one) => "eq" in one && one.key === "story")
    const wanted = group !== undefined && "eq" in group ? group.eq : null
    const inGroup = population.filter((one) => one.story === wanted)
    const from = args.cursor === undefined ? 0 : (decodeCursor(args.cursor).index ?? 0)
    const window = inGroup.slice(from, from + limit)
    const end = from + window.length
    let nextCursor: PageCursor | null = null
    if (end < inGroup.length && window.length > 0) {
      nextCursor = encodeCursor({ values: [], id: String(window.at(-1)?.id ?? ""), index: end })
    }
    return Promise.resolve({
      rows: window.map((one) => applySelect(one, args.select)),
      nextCursor,
      count: args.withCount === true ? inGroup.length : null,
    })
  }
  return { reads: () => reads, widest: () => widest }
}

async function loadOrdered() {
  currentGetSequenceConfig = () => Promise.resolve(currentConfig)
  if (!bound) {
    bound = true
    mock.module("./get", () => ({
      getPage: realGetPage,
      getPageByIdSuffix: realGetPageByIdSuffix,
      getPageByIdSuffixAcrossTypes: realGetPageByIdSuffixAcrossTypes,
      getPages: (args: GetPagesArgs) => currentGetPages(args),
      shapelessWhy: realShapelessWhy,
      unfiledWhy: realUnfiledWhy,
    }))
    mock.module("./page-type-config", () => ({
      asPropertyDefinitionList: realAsPropertyDefinitionList,
      detailConfigSlug: realDetailConfigSlug,
      getMediaConfig: realGetMediaConfig,
      getPropertyDefinitions: realGetPropertyDefinitions,
      getSequenceConfig: (...args: Parameters<typeof realGetSequenceConfig>) =>
        currentGetSequenceConfig(...args),
    }))
  }
  return await import("./ordered?ordered-paging-bound")
}

function at(population: readonly Page[], index: number): Page {
  const one = population[index]
  if (one === undefined) throw new Error(`no chapter stands at ${index}`)
  return one
}

describe("getOrderedChildren over a sequence larger than one backend page", () => {
  test("returns the whole group where the caller asked for no limit", async () => {
    const { getOrderedChildren } = await loadOrdered()
    for (const size of [3, 999, 1000, 1001, 2500]) {
      install(chapters(size, "wandering-inn"))
      const got = await getOrderedChildren({
        pageTypeSlug: "story-chapter",
        parentId: "wandering-inn",
      })
      expect({ size, read: got.length }).toEqual({ size, read: size })
      expect({ size, distinct: new Set(got.map(pageId)).size }).toEqual({ size, distinct: size })
    }
  })

  test("holds sequence order across every page boundary", async () => {
    const { getOrderedChildren } = await loadOrdered()
    install(chapters(2500, "wandering-inn"))
    const got = await getOrderedChildren({
      pageTypeSlug: "story-chapter",
      parentId: "wandering-inn",
    })
    expect(got.map((one: Page) => one.chapterNumber)).toEqual(
      Array.from({ length: 2500 }, (_unused, index) => index)
    )
  })

  test("stops at a limit the caller actually asked for", async () => {
    const { getOrderedChildren } = await loadOrdered()
    install(chapters(2500, "wandering-inn"))
    for (const limit of [1, 250, 1200, 2500, 4000]) {
      const got = await getOrderedChildren({
        pageTypeSlug: "story-chapter",
        parentId: "wandering-inn",
        limit,
      })
      expect({ limit, read: got.length }).toEqual({ limit, read: Math.min(limit, 2500) })
    }
  })

  test("reads only the pages a small limit needs", async () => {
    const { getOrderedChildren } = await loadOrdered()
    const backend = install(chapters(2500, "wandering-inn"))
    await getOrderedChildren({
      pageTypeSlug: "story-chapter",
      parentId: "wandering-inn",
      limit: 10,
    })
    expect(backend.reads()).toBe(1)
  })

  test("never leans on the backend default limit to bound a page", async () => {
    const { getOrderedChildren } = await loadOrdered()
    const backend = install(chapters(2500, "wandering-inn"))
    await getOrderedChildren({
      pageTypeSlug: "story-chapter",
      parentId: "wandering-inn",
    })
    expect(backend.widest()).toBeLessThan(BACKEND_DEFAULT_LIMIT)
  })

  test("keeps one group's rows out of another's", async () => {
    const { getOrderedChildren } = await loadOrdered()
    install([...chapters(1500, "wandering-inn"), ...chapters(1200, "primal-hunter")])
    const got = await getOrderedChildren({
      pageTypeSlug: "story-chapter",
      parentId: "primal-hunter",
    })
    expect(got.length).toBe(1200)
    expect(got.every((one: Page) => one.story === "primal-hunter")).toBe(true)
  })
})

describe("getOrderedNeighbors past the backend default limit", () => {
  test("finds both neighbours at every position, including well past one page", async () => {
    const { getOrderedNeighbors } = await loadOrdered()
    const population = chapters(2500, "wandering-inn")
    install(population)
    for (const index of [1, 499, 500, 501, 999, 1000, 1001, 1500, 2498]) {
      const { prev, next } = await getOrderedNeighbors({ page: at(population, index) })
      expect({ index, prev: prev === null ? null : pageId(prev) }).toEqual({
        index,
        prev: pageId(at(population, index - 1)),
      })
      expect({ index, next: next === null ? null : pageId(next) }).toEqual({
        index,
        next: pageId(at(population, index + 1)),
      })
    }
  })

  test("reports the ends of the sequence as ends rather than as absences", async () => {
    const { getOrderedNeighbors } = await loadOrdered()
    const population = chapters(2500, "wandering-inn")
    install(population)
    const first = await getOrderedNeighbors({ page: at(population, 0) })
    expect(first.prev).toBeNull()
    expect(first.next === null ? null : pageId(first.next)).toBe(pageId(at(population, 1)))
    const last = await getOrderedNeighbors({ page: at(population, 2499) })
    expect(last.next).toBeNull()
    expect(last.prev === null ? null : pageId(last.prev)).toBe(pageId(at(population, 2498)))
  })

  test("gives a page outside the sequence no neighbours", async () => {
    const { getOrderedNeighbors } = await loadOrdered()
    install(chapters(2500, "wandering-inn"))
    const stranger = fixturePage({
      id: "stands-in-no-sequence",
      story: "wandering-inn",
      chapterNumber: -1,
    })
    expect(await getOrderedNeighbors({ page: stranger })).toEqual({
      prev: null,
      next: null,
    })
  })

  test("carries the caller's select without losing the id it matches on", async () => {
    const { getOrderedNeighbors } = await loadOrdered()
    const population = chapters(2500, "wandering-inn")
    install(population)
    const { prev, next } = await getOrderedNeighbors({
      page: at(population, 1500),
      select: ["title", "slug"],
    })
    expect(prev === null ? null : prev.title).toBe("Chapter 1499")
    expect(next === null ? null : next.title).toBe("Chapter 1501")
  })
})

describe("a page type declaring no sequence", () => {
  test("raises rather than answering with an empty sequence", async () => {
    const { getOrderedChildren, getOrderedNeighbors } = await loadOrdered()
    install(chapters(10, "wandering-inn"))
    currentConfig = null
    await expect(
      getOrderedChildren({ pageTypeSlug: "story-chapter", parentId: "wandering-inn" })
    ).rejects.toThrow("declares no sequence config")
    await expect(
      getOrderedNeighbors({
        page: fixturePage({ id: "x" }),
      })
    ).rejects.toThrow("declares no sequence config")
    currentConfig = CONFIG
  })
})
