import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreSaid = {
  id: "01a0c949-e5a0-7352-b330-8def5170c424",
  type: "page-type/text-property",
  slug: "lore-said",
  propertySlug: "said",
  definition: "what a lore entry settles as true",
  maxLength: 4000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
