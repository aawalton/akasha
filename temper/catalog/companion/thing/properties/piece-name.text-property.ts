import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pieceName = {
  id: "01a0e0bf-70b2-7001-8a33-752f774a5d44",
  type: "page-type/text-property",
  slug: "piece-name",
  propertySlug: "piece-name",
  definition: "what the piece of equipment worn in a place is called",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
