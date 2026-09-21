import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const listedNote = {
  id: "01a0c639-f681-78d8-8220-e305b3277345",
  type: "page-type/text-property",
  slug: "listed-note",
  propertySlug: "note",
  definition: "what a page's list says about one of the things in it, beside that thing's numbers",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
