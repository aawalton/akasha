import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Entities = "jsonl"

export const entities = {
  id: "01a0673c-8e0e-7015-a3a2-7c0b31e1cbde",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "entities",
  propertySlug: "entities",
  definition: "everyone and everything in a game's world",
} as const satisfies FileProperty
