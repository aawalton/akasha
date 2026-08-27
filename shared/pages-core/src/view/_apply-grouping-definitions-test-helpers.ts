import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { getPageGroupDefinition } from "./apply-grouping"
import { type GroupableRow, type PageGroupDefinition, type PageResolver } from "./apply-grouping-shared"

export function defOf(
  groupBy: string,
  properties: readonly PropertyDefinition[],
  resolver?: PageResolver | null
): PageGroupDefinition {
  const def = getPageGroupDefinition(groupBy, properties, resolver)
  if (def === null) throw new Error(`expected group definition for ${groupBy}`)
  return def
}

export function keysOf(def: PageGroupDefinition): (item: GroupableRow) => readonly string[] {
  if (def.getKeys === undefined) throw new Error("expected getKeys to be defined")
  return def.getKeys
}

export type TestRow = GroupableRow & {
  readonly _id: string
}

export function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

export const booleanDef: PropertyDefinition = { id: "done", title: "Done", type: "boolean" }
export const selectDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "open", label: "Open" },
      { id: "closed", label: "Closed" },
      { id: "pending", label: "Pending" },
    ],
  },
}
export const multiSelectDef: PropertyDefinition = {
  id: "tags",
  title: "Tags",
  type: "multi-select",
  config: {
    options: [
      { id: "bug", label: "Bug" },
      { id: "feature", label: "Feature" },
      { id: "docs", label: "Docs" },
    ],
  },
}
export const relationDef: PropertyDefinition = { id: "parent", title: "Parent", type: "relation" }
export const multiRelationDef: PropertyDefinition = {
  id: "related",
  title: "Related",
  type: "multi-relation",
}
export const dateDef: PropertyDefinition = { id: "due", title: "Due", type: "calendar-date" }
export const instantDef: PropertyDefinition = { id: "created", title: "Created", type: "instant" }
export const textDef: PropertyDefinition = { id: "title", title: "Title", type: "text" }
export const numberDef: PropertyDefinition = { id: "priority", title: "Priority", type: "number" }
export const urlDef: PropertyDefinition = { id: "link", title: "Link", type: "url" }
export const markdownDef: PropertyDefinition = { id: "body", title: "Body", type: "markdown" }
export const jsonDef: PropertyDefinition = { id: "meta", title: "Meta", type: "json" }

export const allProps: PropertyDefinition[] = [
  booleanDef,
  selectDef,
  multiSelectDef,
  relationDef,
  multiRelationDef,
  dateDef,
  instantDef,
  textDef,
  numberDef,
  urlDef,
  markdownDef,
  jsonDef,
]
