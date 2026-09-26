import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const defaultMainHand = {
  id: "01a0df69-212d-7d4c-91ac-573c71b6859b",
  type: "page-type/text-property",
  slug: "default-main-hand",
  propertySlug: "default-main-hand",
  definition: "the weapon a new build for a role starts with in the main hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
