import type { FileProperty } from "@akasha/pages-system/file-property"

export type TallyCatalog = "json"

export const tallyCatalog = {
  id: "01a06590-c57a-764b-94e8-a476e03b37b5",
  pageTypeSlug: "file-property",
  slug: "tally-catalog",
  propertySlug: "tally-catalog",
  definition: "everything a game counts across its turns, and what each count means",
} as const satisfies FileProperty
