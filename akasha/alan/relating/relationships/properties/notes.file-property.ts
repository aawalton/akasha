import type { FileProperty } from "@akasha/pages-system/file-property"

export type Notes = "txt"

export const notes = {
  id: "01a0658a-f4df-7958-97db-59300db8c235",
  pageTypeSlug: "file-property",
  slug: "notes",
  propertySlug: "notes",
  definition: "what Alan keeps written about this person",
} as const satisfies FileProperty
