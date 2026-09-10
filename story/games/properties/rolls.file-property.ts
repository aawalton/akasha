import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Rolls = "jsonl"

export const rolls = {
  id: "01a0673c-8e0e-7017-be58-4c9c920c8a5f",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "rolls",
  propertySlug: "rolls",
  definition: "every roll a game has settled an action by",
} as const satisfies FileProperty
