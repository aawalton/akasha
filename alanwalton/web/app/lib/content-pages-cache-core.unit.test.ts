import { describe, expect, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import {
  addContentPageIds,
  addPinnedIds,
  type ContentPageIndex,
  computeEvictableIds,
  EMPTY_CONTENT_PAGE_INDEX,
  mergeContentPage,
  parseContentPageIndex,
  parsePersistedContentPage,
  removeContentPageIds,
  serializeContentPage,
  serializeContentPageIndex,
  touchRecency,
} from "./content-pages-cache-core"

function mkPage(id: string, extra: Record<string, unknown> = {}): Page {
  return Page({
    id,
    seq: 1,
    title: "Chapter",
    icon: null,
    slug: null,
    userId: "user-1",
    pageTypeId: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    pageTypeSlug: "story-chapter",
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z",
    uniqueKey: null,
    parentKey: null,
    ...extra,
  })
}

function mkIndex(parts: Partial<Omit<ContentPageIndex, "version">> = {}): ContentPageIndex {
  return {
    version: 1,
    ids: parts.ids ?? [],
    pinnedIds: parts.pinnedIds ?? [],
    recency: parts.recency ?? [],
  }
}

describe("parseContentPageIndex", () => {
  test("round-trips a valid index", () => {
    const index = mkIndex({ ids: ["a", "b"], pinnedIds: ["a"], recency: ["b", "a"] })
    expect(parseContentPageIndex(serializeContentPageIndex(index))).toEqual(index)
  })

  test("the empty index round-trips", () => {
    expect(parseContentPageIndex(serializeContentPageIndex(EMPTY_CONTENT_PAGE_INDEX))).toEqual(
      EMPTY_CONTENT_PAGE_INDEX
    )
  })

  test("a pre-IMPL-4 v1 file without `pinnedIds` parses, defaulting to [] (add-before-remove)", () => {
    expect(parseContentPageIndex(JSON.stringify({ version: 1, ids: ["a", "b"] }))).toEqual({
      version: 1,
      ids: ["a", "b"],
      pinnedIds: [],
      recency: [],
    })
  })

  test("a pre-IMPL-5 v1 file without `recency` parses, defaulting to [] (add-before-remove)", () => {
    expect(
      parseContentPageIndex(JSON.stringify({ version: 1, ids: ["a"], pinnedIds: ["a"] }))
    ).toEqual({ version: 1, ids: ["a"], pinnedIds: ["a"], recency: [] })
  })

  test("malformed JSON → empty index", () => {
    expect(parseContentPageIndex("{not json")).toEqual(EMPTY_CONTENT_PAGE_INDEX)
    expect(parseContentPageIndex("")).toEqual(EMPTY_CONTENT_PAGE_INDEX)
  })

  test("wrong schema version → empty index (stale build)", () => {
    expect(parseContentPageIndex(JSON.stringify({ version: 2, ids: [] }))).toEqual(
      EMPTY_CONTENT_PAGE_INDEX
    )
  })

  test("extra / missing top-level key → empty index (strict)", () => {
    expect(parseContentPageIndex(JSON.stringify({ version: 1 }))).toEqual(EMPTY_CONTENT_PAGE_INDEX)
    expect(parseContentPageIndex(JSON.stringify({ version: 1, ids: [], extra: true }))).toEqual(
      EMPTY_CONTENT_PAGE_INDEX
    )
  })
})

describe("parsePersistedContentPage", () => {
  test("round-trips a content-bearing page (prose preserved through passthrough)", () => {
    const page = mkPage("0190f3a0-1234-7abc-9def-000000000001", { text: "Once upon a time…" })
    const parsed = parsePersistedContentPage(serializeContentPage(page))
    expect(parsed).not.toBeNull()
    expect(parsed?.id).toBe("0190f3a0-1234-7abc-9def-000000000001")
    expect(parsed?.text).toBe("Once upon a time…")
  })

  test("malformed JSON → null", () => {
    expect(parsePersistedContentPage("{not json")).toBeNull()
    expect(parsePersistedContentPage("")).toBeNull()
  })

  test("a page missing a required column → null (never a partial load)", () => {
    expect(parsePersistedContentPage(JSON.stringify({ id: "x" }))).toBeNull()
  })
})

describe("mergeContentPage (prose preservation)", () => {
  test("a light overlay lacking `text` retains the existing prose", () => {
    const withProse = mkPage("id-1", { text: "the body" })
    const light = mkPage("id-1", { title: "Updated" })
    const merged = mergeContentPage(withProse, light)
    expect(merged.text).toBe("the body")
    expect(merged.title).toBe("Updated")
  })

  test("a content overlay's fresher prose wins on overlap", () => {
    const old = mkPage("id-1", { text: "old body" })
    const fresh = mkPage("id-1", { text: "new body" })
    expect(mergeContentPage(old, fresh).text).toBe("new body")
  })

  test("null existing → the fresh page passes through", () => {
    const fresh = mkPage("id-1", { text: "body" })
    expect(mergeContentPage(null, fresh)).toEqual(fresh)
  })
})

describe("addContentPageIds", () => {
  test("appends genuinely-new ids, order-stable", () => {
    const index = mkIndex({ ids: ["a"] })
    expect(addContentPageIds(index, ["b", "c"])).toEqual(mkIndex({ ids: ["a", "b", "c"] }))
  })

  test("de-duplicates against existing ids", () => {
    const index = mkIndex({ ids: ["a", "b"] })
    expect(addContentPageIds(index, ["b", "a"])).toEqual(index)
  })

  test("no new ids → the same index reference (no needless write)", () => {
    const index = mkIndex({ ids: ["a"] })
    expect(addContentPageIds(index, ["a"])).toBe(index)
  })

  test("carries `pinnedIds` + `recency` forward unchanged (a body write must not drop them)", () => {
    const index = mkIndex({ ids: ["a"], pinnedIds: ["a"], recency: ["a"] })
    expect(addContentPageIds(index, ["b"])).toEqual(
      mkIndex({ ids: ["a", "b"], pinnedIds: ["a"], recency: ["a"] })
    )
  })
})

describe("addPinnedIds (eviction-exempt marking — #14800)", () => {
  test("appends genuinely-new pinned ids, order-stable", () => {
    const index = mkIndex({ ids: ["a", "b"], pinnedIds: ["a"] })
    expect(addPinnedIds(index, ["b", "c"])).toEqual(
      mkIndex({ ids: ["a", "b"], pinnedIds: ["a", "b", "c"] })
    )
  })

  test("de-duplicates against already-pinned ids", () => {
    const index = mkIndex({ ids: ["a", "b"], pinnedIds: ["a", "b"] })
    expect(addPinnedIds(index, ["b", "a"])).toBe(index)
  })

  test("no new pinned ids → the same index reference (no needless write)", () => {
    const index = mkIndex({ ids: ["a"], pinnedIds: ["a"] })
    expect(addPinnedIds(index, ["a"])).toBe(index)
  })

  test("pins an id whose body is not yet cached (pin marking is independent of `ids`)", () => {
    const index = mkIndex({})
    expect(addPinnedIds(index, ["a"])).toEqual(mkIndex({ pinnedIds: ["a"] }))
  })
})

describe("touchRecency (LRU touch — #14801)", () => {
  test("moves a touched cached id to the MRU end", () => {
    const index = mkIndex({ ids: ["a", "b", "c"], recency: ["a", "b", "c"] })
    expect(touchRecency(index, ["a"]).recency).toEqual(["b", "c", "a"])
  })

  test("adds a never-touched cached id to the MRU end", () => {
    const index = mkIndex({ ids: ["a", "b"], recency: ["a"] })
    expect(touchRecency(index, ["b"]).recency).toEqual(["a", "b"])
  })

  test("touching multiple ids preserves their call order at the end", () => {
    const index = mkIndex({ ids: ["a", "b", "c"], recency: ["a", "b", "c"] })
    expect(touchRecency(index, ["c", "a"]).recency).toEqual(["b", "c", "a"])
  })

  test("ignores ids that are not cached bodies", () => {
    const index = mkIndex({ ids: ["a"], recency: ["a"] })
    expect(touchRecency(index, ["ghost"])).toBe(index)
  })

  test("no order change → same reference (no needless write)", () => {
    const index = mkIndex({ ids: ["a", "b"], recency: ["a", "b"] })
    expect(touchRecency(index, ["b"])).toBe(index)
  })

  test("de-dupes a repeated touch id", () => {
    const index = mkIndex({ ids: ["a", "b"], recency: ["a", "b"] })
    expect(touchRecency(index, ["a", "a"]).recency).toEqual(["b", "a"])
  })
})

describe("computeEvictableIds (bounded LRU, pins exempt — #14801)", () => {
  test("evicts the oldest unpinned ids past the bound", () => {
    const index = mkIndex({ ids: ["a", "b", "c", "d"], recency: ["a", "b", "c", "d"] })
    expect(computeEvictableIds(index, 2)).toEqual(["a", "b"])
  })

  test("never evicts pinned ids — they do not count against the bound", () => {
    const index = mkIndex({
      ids: ["a", "b", "c", "d", "e"],
      pinnedIds: ["a", "b"],
      recency: ["a", "b", "c", "d", "e"],
    })
    expect(computeEvictableIds(index, 2)).toEqual(["c"])
  })

  test("within the bound → no eviction", () => {
    const index = mkIndex({ ids: ["a", "b"], recency: ["a", "b"] })
    expect(computeEvictableIds(index, 5)).toEqual([])
  })

  test("an unpinned id absent from `recency` is oldest (evicted first)", () => {
    const index = mkIndex({ ids: ["a", "b", "ghost"], recency: ["a", "b"] })
    expect(computeEvictableIds(index, 2)).toEqual(["ghost"])
  })

  test("a fully-pinned cache never evicts, even far past the bound", () => {
    const index = mkIndex({
      ids: ["a", "b", "c"],
      pinnedIds: ["a", "b", "c"],
      recency: ["a", "b", "c"],
    })
    expect(computeEvictableIds(index, 1)).toEqual([])
  })
})

describe("removeContentPageIds (drop evicted bodies — #14801)", () => {
  test("drops ids from `ids` and `recency`, order-stable, leaving `pinnedIds`", () => {
    const index = mkIndex({
      ids: ["a", "b", "c"],
      pinnedIds: ["c"],
      recency: ["a", "b", "c"],
    })
    expect(removeContentPageIds(index, ["a"])).toEqual(
      mkIndex({ ids: ["b", "c"], pinnedIds: ["c"], recency: ["b", "c"] })
    )
  })

  test("no matching id → same reference (no needless write)", () => {
    const index = mkIndex({ ids: ["a"], recency: ["a"] })
    expect(removeContentPageIds(index, ["ghost"])).toBe(index)
    expect(removeContentPageIds(index, [])).toBe(index)
  })
})
