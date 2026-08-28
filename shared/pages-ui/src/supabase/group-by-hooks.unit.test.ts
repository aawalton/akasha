import { describe, expect, it } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { GROUP_NONE_KEY } from "@shared/pages-core/view/apply-grouping-shared"
import { applyClientViewFilters } from "./apply-client-view-filters"
import { bucketRowsByGroup } from "./group-by-hooks"

const row = (id: string, status: string): Page =>
  Page({
    id,
    seq: 0,
    title: id,
    icon: null,
    userId: "u",
    pageTypeId: "pt-1",
    pageTypeSlug: "thing",
    createdAt: "1970-01-01T00:00:00Z",
    updatedAt: "1970-01-01T00:00:00Z",
    status,
  })

describe("bucketRowsByGroup", () => {
  it("assigns each bucket its own row count, not the shared filter-set total", () => {
    const rows: readonly Page[] = [
      row("1", "open"),
      row("2", "open"),
      row("3", "open"),
      row("4", "done"),
      row("5", "done"),
    ]
    const groups = bucketRowsByGroup({
      rows,
      groupPropertyId: "status",
      isLoading: false,
      hasMore: false,
    })
    expect(groups.get("open")?.totalCount).toBe(3)
    expect(groups.get("done")?.totalCount).toBe(2)
  })

  it("treats a missing group property value as the empty group", () => {
    const rows: readonly Page[] = [
      row("1", "open"),
      Page({
        id: "2",
        seq: 0,
        title: "2",
        icon: null,
        userId: "u",
        pageTypeId: "pt-1",
        pageTypeSlug: "thing",
        createdAt: "1970-01-01T00:00:00Z",
        updatedAt: "1970-01-01T00:00:00Z",
      }),
    ]
    const groups = bucketRowsByGroup({
      rows,
      groupPropertyId: "status",
      isLoading: false,
      hasMore: false,
    })
    expect(groups.get("open")?.totalCount).toBe(1)
    expect(groups.get(GROUP_NONE_KEY)?.totalCount).toBe(1)
  })

  it("threads loading and load-more flags onto every bucket", () => {
    const rows: readonly Page[] = [row("1", "open"), row("2", "done")]
    const groups = bucketRowsByGroup({
      rows,
      groupPropertyId: "status",
      isLoading: true,
      hasMore: true,
    })
    for (const entry of groups.values()) {
      expect(entry.isLoading).toBe(true)
      expect(entry.canLoadMore).toBe(true)
    }
  })

  it("returns an empty map when there are no rows", () => {
    expect(
      bucketRowsByGroup({
        rows: [],
        groupPropertyId: "status",
        isLoading: false,
        hasMore: false,
      }).size
    ).toBe(0)
  })
})

const personaRow = (id: string, persona: readonly string[]): Page =>
  Page({
    id,
    seq: 0,
    title: id,
    icon: null,
    userId: "u",
    pageTypeId: "pt-1",
    pageTypeSlug: "persona-image",
    createdAt: "1970-01-01T00:00:00Z",
    updatedAt: "1970-01-01T00:00:00Z",
    persona: [...persona],
  })

const PERSONA_DEF: PropertyDefinition = {
  id: "persona",
  title: "Persona",
  type: "multi-relation",
}

describe("bucketRowsByGroup — multi-relation group key (#13150)", () => {
  it("places a multi-persona row in one bucket per listed persona", () => {
    const groups = bucketRowsByGroup({
      rows: [personaRow("1", ["aria", "mari"])],
      groupPropertyId: "persona",
      isLoading: false,
      hasMore: false,
      properties: [PERSONA_DEF],
    })
    expect(groups.get("aria")?.totalCount).toBe(1)
    expect(groups.get("mari")?.totalCount).toBe(1)
    expect(groups.has("aria,mari")).toBe(false)
  })

  it("a single-element array groups under its one persona only", () => {
    const groups = bucketRowsByGroup({
      rows: [personaRow("1", ["aria"])],
      groupPropertyId: "persona",
      isLoading: false,
      hasMore: false,
      properties: [PERSONA_DEF],
    })
    expect(groups.get("aria")?.totalCount).toBe(1)
    expect(groups.size).toBe(1)
  })

  it("counts each persona bucket by its true membership across mixed rows", () => {
    const groups = bucketRowsByGroup({
      rows: [
        personaRow("1", ["aria", "mari"]),
        personaRow("2", ["aria"]),
        personaRow("3", ["mari"]),
      ],
      groupPropertyId: "persona",
      isLoading: false,
      hasMore: false,
      properties: [PERSONA_DEF],
    })
    expect(groups.get("aria")?.totalCount).toBe(2)
    expect(groups.get("mari")?.totalCount).toBe(2)
  })

  it("buckets an empty multi-relation array as the empty group", () => {
    const groups = bucketRowsByGroup({
      rows: [personaRow("1", [])],
      groupPropertyId: "persona",
      isLoading: false,
      hasMore: false,
      properties: [PERSONA_DEF],
    })
    expect(groups.get(GROUP_NONE_KEY)?.totalCount).toBe(1)
  })
})

describe("grouped path applies client-only filters before bucketing (#15118)", () => {
  const STATUS_DEF: PropertyDefinition = { id: "status", title: "Status", type: "text" }
  const NOTES_DEF: PropertyDefinition = { id: "notes", title: "Notes", type: "rich-document" }

  const notesRow = (id: string, status: string, notes: unknown): Page =>
    Page({
      id,
      seq: 0,
      title: id,
      icon: null,
      userId: "u",
      pageTypeId: "pt-1",
      pageTypeSlug: "thing",
      createdAt: "1970-01-01T00:00:00Z",
      updatedAt: "1970-01-01T00:00:00Z",
      status,
      notes,
    })

  it("excludes rich-document-empty rows from every group under is_not_empty", () => {
    const rows: readonly Page[] = [
      notesRow("a", "open", { blocks: [{ type: "paragraph", text: "real" }] }),
      notesRow("b", "open", { blocks: [] }),
      notesRow("c", "done", { blocks: [{ type: "paragraph", text: "" }] }),
      notesRow("d", "done", { blocks: [{ type: "paragraph", text: "kept" }] }),
    ]
    const filtered = applyClientViewFilters(
      rows,
      [{ propertyId: "notes", operator: "is_not_empty" }],
      [STATUS_DEF, NOTES_DEF],
      "pt-1",
      undefined
    )
    const groups = bucketRowsByGroup({
      rows: filtered,
      groupPropertyId: "status",
      isLoading: false,
      hasMore: false,
      properties: [STATUS_DEF, NOTES_DEF],
    })
    expect(groups.get("open")?.totalCount).toBe(1)
    expect(groups.get("done")?.totalCount).toBe(1)
    expect(filtered.map((r) => r.id)).toEqual(["a", "d"])
  })
})
