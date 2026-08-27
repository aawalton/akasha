import { describe, expect, test } from "bun:test"
import type { PageWithProperties } from "../supabase/types"
import { buildPageResolver } from "./build-page-resolver"

function page(id: string, props: Record<string, unknown>): PageWithProperties {
  return { _id: id, properties: props }
}

describe("buildPageResolver (#15516 — the one resolution seam)", () => {
  test("resolves a page id to its title", () => {
    const r = buildPageResolver([[page("s1", { title: "Dungeon Crawl" })]])
    expect(r.resolve("s1")?.title).toBe("Dungeon Crawl")
  })

  test("a blank/absent title indexes as empty string — NEVER the id (no raw-id leak)", () => {
    const r = buildPageResolver([[page("s1", {}), page("s2", { title: "" })]])
    expect(r.resolve("s1")?.title).toBe("")
    expect(r.resolve("s2")?.title).toBe("")
    expect(r.resolve("s1")?.title).not.toBe("s1")
  })

  test("resolve returns null for an id absent from every set (dangling ref)", () => {
    const r = buildPageResolver([[page("s1", { title: "A" })]])
    expect(r.resolve("missing")).toBeNull()
  })

  test("later sets win on id collision (relation targets override earlier entries)", () => {
    const r = buildPageResolver([[page("x", { title: "stale" })], [page("x", { title: "fresh" })]])
    expect(r.resolve("x")?.title).toBe("fresh")
  })

  test("carries color and sortOrder when present and valid", () => {
    const r = buildPageResolver([[page("s1", { title: "A", color: "red", sortOrder: 3 })]])
    const entry = r.resolve("s1")
    expect(entry?.color).toBe("red")
    expect(entry?.sortOrder).toBe(3)
  })

  test("listPages without a descendant filter returns every entry", () => {
    const r = buildPageResolver([[page("a", { title: "A" }), page("b", { title: "B" })]])
    expect(
      r
        .listPages()
        .map((p) => p.id)
        .sort()
    ).toEqual(["a", "b"])
  })

  test("listPages filters to the descendant subtree when a getDescendantSet is supplied", () => {
    const r = buildPageResolver(
      [
        [
          page("a", { title: "A", pageTypeId: "t-story" }),
          page("b", { title: "B", pageTypeId: "t-other" }),
        ],
      ],
      { getDescendantSet: () => new Set(["t-story"]) }
    )
    expect(r.listPages("t-story").map((p) => p.id)).toEqual(["a"])
  })
})
