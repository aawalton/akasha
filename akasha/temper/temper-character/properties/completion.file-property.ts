import type { FileProperty } from "@akasha/pages-system/file-property"

export type Completion = "json"

export const completion = {
  id: "01a05fc7-243a-7845-a43d-fcbdc7c24ce0",
  pageTypeSlug: "file-property",
  slug: "completion",
  propertySlug: "completion",
  definition: "what the game says has been finished, as the game handed it over",
} as const satisfies FileProperty
