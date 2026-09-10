import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type TallyCatalog = "json"

export const tallyCatalog = {
  id: "01a06590-c57a-764b-94e8-a476e03b37b5",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "tally-catalog",
  propertySlug: "tally-catalog",
  definition: "everything a game counts across its turns, and what each count means",
} as const satisfies FileProperty
