import type { TextProperty } from "@akasha/pages-system/text-property"

export type Fen = string

export const fen = {
  id: "01a06582-bd62-7ebf-aa25-768dcbb38374",
  pageTypeSlug: "text-property",
  slug: "fen",
  propertySlug: "fen",
  definition: "a position in Forsyth-Edwards notation",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
