import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const defaultOffHand = {
  id: "01a0df69-212e-7648-81b2-68a1167a5ce3",
  type: "page-type/text-property",
  slug: "default-off-hand",
  propertySlug: "default-off-hand",
  definition: "the weapon a new build for a role starts with in the off hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
