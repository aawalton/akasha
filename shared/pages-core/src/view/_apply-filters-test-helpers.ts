import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import type { FilterableRow } from "./apply-filters"

export const UNIVERSAL_DEFS: readonly PropertyDefinition[] = [
  { id: "id", title: "ID", type: "text", config: {} },
  { id: "completedAt", title: "Completed At", type: "instant", config: {} },
  { id: "pageTypeId", title: "Page Type", type: "relation", config: {} },
  { id: "userId", title: "User", type: "text", config: {} },
  { id: "seq", title: "Seq", type: "number", config: {} },
  { id: "icon", title: "Icon", type: "text", config: {} },
  { id: "title", title: "Title", type: "text", config: {} },
] as const

export function row(data: Record<string, ReadonlyJSONValue>): FilterableRow {
  return data
}

export const textDef: PropertyDefinition = { id: "t", title: "Text", type: "text" }
export const numberDef: PropertyDefinition = { id: "n", title: "Num", type: "number" }
export const booleanDef: PropertyDefinition = { id: "c", title: "Check", type: "boolean" }
export const dateDef: PropertyDefinition = { id: "d", title: "Date", type: "calendar-date" }
export const jsonDef: PropertyDefinition = { id: "j", title: "JSON", type: "json" }
export const selectDef: PropertyDefinition = { id: "s", title: "Sel", type: "select" }
export const multiSelectDef: PropertyDefinition = { id: "ms", title: "MS", type: "multi-select" }
export const relationDef: PropertyDefinition = { id: "r", title: "Rel", type: "relation" }
export const multiRelationDef: PropertyDefinition = {
  id: "mr",
  title: "MRel",
  type: "multi-relation",
}
export const formulaNumberDef: PropertyDefinition = {
  id: "f",
  title: "Formula",
  type: "formula",
  config: { expression: "1+1", returnType: "number" },
}
export const formulaTextDef: PropertyDefinition = {
  id: "ft",
  title: "FormulaText",
  type: "formula",
  config: { expression: "'x'", returnType: "text" },
}
export const formulaBooleanDef: PropertyDefinition = {
  id: "fc",
  title: "FormulaChk",
  type: "formula",
  config: { expression: "true", returnType: "boolean" },
}
