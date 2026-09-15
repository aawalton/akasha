import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const fen = {
  id: "01a06582-bd62-7ebf-aa25-768dcbb38374",
  type: "page-type/text-property",
  slug: "fen",
  propertySlug: "fen",
  definition: "a position in Forsyth-Edwards notation",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
