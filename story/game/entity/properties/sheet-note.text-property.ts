import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sheetNote = {
  id: "01a0c639-f681-78d8-8220-e305b3277345",
  type: "page-type/text-property",
  slug: "sheet-note",
  propertySlug: "note",
  definition: "what a sheet says about one of the things it lists, beside that thing's numbers",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
