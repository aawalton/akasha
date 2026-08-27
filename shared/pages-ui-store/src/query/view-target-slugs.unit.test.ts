import { describe, expect, test } from "bun:test"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { deriveViewTargetSlugs } from "./view-target-slugs"

const TASK = "task-type-id"
const CHAR = "char-type-id"
const PERSON = "person-type-id"
const PROJ = "proj-type-id"
const TAG = "tag-type-id"

const TASK_DEFS: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text" },
  { id: "character", title: "Character", type: "relation", config: { targetPageTypeId: CHAR } },
  {
    id: "characterSortOrder",
    title: "Character Sort Order",
    type: "rollup",
    config: { relationPropertyId: "character", targetPropertyId: "sortOrder" },
  },
  { id: "assignee", title: "Assignee", type: "relation", config: { targetPageTypeId: PERSON } },
  { id: "project", title: "Project", type: "relation", config: { targetPageTypeId: PROJ } },
  { id: "tag", title: "Tag", type: "relation", config: { targetPageTypeId: TAG } },
]

const DEFS: PageTypePropertiesMap = new Map([
  [TASK, TASK_DEFS],
  [CHAR, [{ id: "sortOrder", title: "Sort Order", type: "number" }]],
  [PERSON, [{ id: "name", title: "Name", type: "text" }]],
  [PROJ, [{ id: "name", title: "Name", type: "text" }]],
  [TAG, [{ id: "name", title: "Name", type: "text" }]],
])

const SLUGS: ReadonlyMap<string, string | undefined> = new Map([
  [TASK, "task"],
  [CHAR, "char"],
  [PERSON, "person"],
  [PROJ, "proj"],
  [TAG, "tag"],
])

describe("deriveViewTargetSlugs", () => {
  test("partitions targets: sort/filter/group gate; display-only column is display", () => {
    const config: ViewDataJSON = {
      version: 1,
      sorts: [{ field: "characterSortOrder", direction: "desc" }],
      filters: [{ propertyId: "assignee", operator: "is_not_empty" }],
      group_by: "project",
      visible_properties: ["tag", "character", "title"],
    }
    const { gating, display } = deriveViewTargetSlugs(config, TASK, DEFS, SLUGS)
    expect(gating).toEqual(["char", "person", "proj"])
    expect(display).toEqual(["tag"])
  })

  test("a rollup sort key alone yields exactly its target in gating (the #15778 case)", () => {
    const config: ViewDataJSON = {
      version: 1,
      sorts: [
        { field: "priority", direction: "asc" },
        { field: "characterSortOrder", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    }
    const { gating, display } = deriveViewTargetSlugs(config, TASK, DEFS, SLUGS)
    expect(gating).toEqual(["char"])
    expect(display).toEqual([])
  })

  test("no relation/rollup references → empty sets", () => {
    const config: ViewDataJSON = {
      version: 1,
      sorts: [{ field: "title", direction: "asc" }],
      visible_properties: ["title"],
    }
    const { gating, display } = deriveViewTargetSlugs(config, TASK, DEFS, SLUGS)
    expect(gating).toEqual([])
    expect(display).toEqual([])
  })

  test("a target type with no known slug is dropped (not acquirable)", () => {
    const slugsMissingChar: ReadonlyMap<string, string | undefined> = new Map([
      [TASK, "task"],
      [CHAR, undefined],
    ])
    const config: ViewDataJSON = {
      version: 1,
      sorts: [{ field: "characterSortOrder", direction: "desc" }],
    }
    const { gating } = deriveViewTargetSlugs(config, TASK, DEFS, slugsMissingChar)
    expect(gating).toEqual([])
  })
})
