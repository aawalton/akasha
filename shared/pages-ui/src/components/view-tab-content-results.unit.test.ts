import { describe, expect, test } from "bun:test"
import { PageTypeSlug } from "@shared/pages-url"
import type { PageWithProperties } from "../supabase/types"
import { selectViewQueryResult } from "./view-tab-content-results"

const SLUG = PageTypeSlug("story")

function page(id: string): PageWithProperties {
  return { _id: id, properties: { id } }
}

const FLAT_ROWS: readonly PageWithProperties[] = [page("a"), page("b")]

const FLAT_LOADING = {
  pages: FLAT_ROWS,
  isLoading: true,
  hasMore: true,
  loadMore: () => {},
  totalCount: 7,
}

const GROUPED = { isLoading: false, totalCount: 3 }

describe("selectViewQueryResult", () => {
  test("cross-type + no group_by → flat path drives rows, isLoading, and count", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: undefined,
      crossType: true,
      flatResult: FLAT_LOADING,
      groupedResult: GROUPED,
    })
    expect(result.pages).toEqual(FLAT_ROWS)
    expect(result.canLoadMore).toBe(true)
    expect(result.loadMore).toBeDefined()
    expect(result.isLoading).toBe(true)
    expect(result.totalCount).toBe(7)
  })

  test("single-type + slug (not cross-type) → flat path unchanged", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: SLUG,
      crossType: false,
      flatResult: FLAT_LOADING,
      groupedResult: GROUPED,
    })
    expect(result.pages).toEqual(FLAT_ROWS)
    expect(result.canLoadMore).toBe(true)
    expect(result.isLoading).toBe(true)
    expect(result.totalCount).toBe(7)
  })

  test("grouped (group_by set) → grouped source wins, no flat rows", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: "status",
      rowPageTypeSlug: SLUG,
      crossType: false,
      flatResult: FLAT_LOADING,
      groupedResult: GROUPED,
    })
    expect(result.pages).toEqual([])
    expect(result.loadMore).toBeUndefined()
    expect(result.canLoadMore).toBe(false)
    expect(result.isLoading).toBe(false)
    expect(result.totalCount).toBe(3)
  })

  test("genuinely-empty single-type (no slug, not cross-type) → stays empty", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: undefined,
      crossType: false,
      flatResult: FLAT_LOADING,
      groupedResult: GROUPED,
    })
    expect(result.pages).toEqual([])
    expect(result.loadMore).toBeUndefined()
    expect(result.canLoadMore).toBe(false)
    expect(result.isLoading).toBe(false)
    expect(result.totalCount).toBeNull()
  })

  const READ_ERROR = new Error("pipeline read() threw")

  test("flat source error → surfaced on the flat (single-type) branch", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: SLUG,
      crossType: false,
      flatResult: { ...FLAT_LOADING, error: READ_ERROR },
      groupedResult: GROUPED,
    })
    expect(result.error).toBe(READ_ERROR)
  })

  test("grouped source error → surfaced on the grouped branch (flat error ignored)", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: "status",
      rowPageTypeSlug: SLUG,
      crossType: false,
      flatResult: { ...FLAT_LOADING, error: new Error("flat — not the active branch") },
      groupedResult: { ...GROUPED, error: READ_ERROR },
    })
    expect(result.error).toBe(READ_ERROR)
  })

  test("no active source (no slug, not cross-type) → error is null", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: undefined,
      crossType: false,
      flatResult: { ...FLAT_LOADING, error: READ_ERROR },
      groupedResult: GROUPED,
    })
    expect(result.error).toBeNull()
  })

  test("no error on either source → error is null", () => {
    const result = selectViewQueryResult({
      groupByPropertyId: undefined,
      rowPageTypeSlug: SLUG,
      crossType: false,
      flatResult: FLAT_LOADING,
      groupedResult: GROUPED,
    })
    expect(result.error).toBeNull()
  })
})
