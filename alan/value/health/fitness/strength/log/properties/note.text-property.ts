import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const note = {
  id: "01a06580-66fd-779f-a536-de00d810a18d",
  type: "page-type/text-property",
  slug: "note",
  propertySlug: "note",
  definition: "what Alan said about the set as he logged it",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
