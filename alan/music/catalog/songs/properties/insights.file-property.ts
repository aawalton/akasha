import type { FileProperty } from "@akasha/pages-system/file-property"

export type Insights = "txt"

export const insights = {
  id: "01a06243-144b-700e-a1ca-924ff3e3afdf",
  pageTypeSlug: "file-property",
  slug: "insights",
  propertySlug: "insights",
  definition: "what Alan found in a song when he read it",
} as const satisfies FileProperty
