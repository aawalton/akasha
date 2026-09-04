import type { FileProperty } from "@akasha/pages-system/file-property"

export type Reaction = "txt"

export const reaction = {
  id: "01a06243-144b-7011-8f74-d30df7a6c48b",
  pageTypeSlug: "file-property",
  slug: "reaction",
  propertySlug: "reaction",
  definition: "what Alan said about an artist when he read them",
} as const satisfies FileProperty
