import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type DesignEntries = "jsonl"

export const designEntries = {
  id: "01a0673e-1000-7002-b433-9d61c2ba0733",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "design-entries",
  propertySlug: "design-entries",
  definition: "the decisions a game's design rests on",
} as const satisfies FileProperty
