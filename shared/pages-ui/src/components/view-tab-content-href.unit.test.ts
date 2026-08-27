import { describe, expect, test } from "bun:test"
import { PageTypeSlug } from "@shared/pages-url"
import type { PageWithProperties } from "../supabase/types"
import { buildRelationBackLinkHref, resolveRowPageTypeSlug } from "./view-tab-content-href"

const pluralSlugById = new Map<string, string>([
  ["pt-task", "tasks"],
  ["pt-project", "projects"],
])

describe("buildRelationBackLinkHref", () => {
  test("routes to the target type's PLURAL listing slug, not /pages/{singular}", () => {
    const href = buildRelationBackLinkHref({
      target: { targetPageTypeId: "pt-task", backRelationPropertyId: "prop-parent" },
      rowId: "row-123",
      fallbackHref: "/projects/p-abc",
      pluralSlugById,
    })
    expect(href).toBe("/tasks/?prop-parent=row-123")
    expect(href.startsWith("/pages/")).toBe(false)
  })

  test("uses the resolved plural slug for the matching target id", () => {
    expect(
      buildRelationBackLinkHref({
        target: { targetPageTypeId: "pt-project", backRelationPropertyId: "prop-owner" },
        rowId: "row-9",
        fallbackHref: "/x/y",
        pluralSlugById,
      })
    ).toBe("/projects/?prop-owner=row-9")
  })

  test("returns fallbackHref when the relation target is unresolved", () => {
    expect(
      buildRelationBackLinkHref({
        target: undefined,
        rowId: "row-1",
        fallbackHref: "/fallback/here",
        pluralSlugById,
      })
    ).toBe("/fallback/here")
  })

  test("returns fallbackHref when the target type's plural slug is unknown", () => {
    expect(
      buildRelationBackLinkHref({
        target: { targetPageTypeId: "pt-missing", backRelationPropertyId: "prop-x" },
        rowId: "row-1",
        fallbackHref: "/fallback/here",
        pluralSlugById,
      })
    ).toBe("/fallback/here")
  })

  test("returns fallbackHref when the resolved plural slug is empty", () => {
    expect(
      buildRelationBackLinkHref({
        target: { targetPageTypeId: "pt-empty", backRelationPropertyId: "prop-x" },
        rowId: "row-1",
        fallbackHref: "/fallback/here",
        pluralSlugById: new Map([["pt-empty", ""]]),
      })
    ).toBe("/fallback/here")
  })
})

describe("resolveRowPageTypeSlug", () => {
  const slugById = new Map<string, PageTypeSlug>([
    ["pt-story", PageTypeSlug("story")],
    ["pt-project", PageTypeSlug("project")],
  ])
  const pages: readonly PageWithProperties[] = [
    {
      _id: "row-story",
      properties: { pageTypeId: "pt-story", title: "Ravah" },
    },
    {
      _id: "row-project",
      properties: { pageTypeId: "pt-project", title: "Temper" },
    },
    {
      _id: "row-orphan",
      properties: { pageTypeId: "pt-unknown", title: "Lost" },
    },
  ]

  test("returns the view-level slug unchanged in single-type mode (fast path, ignores pages)", () => {
    expect(resolveRowPageTypeSlug(PageTypeSlug("persona"), "row-story", [], slugById)).toBe(
      PageTypeSlug("persona")
    )
  })

  test("resolves the row's own page-type slug in cross-type mode (view-level slug undefined)", () => {
    expect(resolveRowPageTypeSlug(undefined, "row-story", pages, slugById)).toBe(
      PageTypeSlug("story")
    )
    expect(resolveRowPageTypeSlug(undefined, "row-project", pages, slugById)).toBe(
      PageTypeSlug("project")
    )
  })

  test("returns undefined when the row id is not present in pages", () => {
    expect(resolveRowPageTypeSlug(undefined, "row-missing", pages, slugById)).toBeUndefined()
  })

  test("returns undefined when the row's page-type id has no registered slug", () => {
    expect(resolveRowPageTypeSlug(undefined, "row-orphan", pages, slugById)).toBeUndefined()
  })
})
