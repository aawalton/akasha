import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const tallyCatalog = {
  id: "01a06590-c57a-764b-94e8-a476e03b37b5",
  type: "file-property",
  slug: "tally-catalog",
  propertySlug: "tally-catalog",
  definition: "everything a game counts across its turns, and what each count means",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
