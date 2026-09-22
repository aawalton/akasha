import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slotCategory = {
  id: "01a05fcd-aed0-7287-87ee-60a32ae62e26",
  type: "page-type/text-property",
  slug: "slot-category",
  propertySlug: "slot-category",
  definition: "a jewelry place's group",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
