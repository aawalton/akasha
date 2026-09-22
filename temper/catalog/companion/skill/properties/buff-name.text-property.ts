import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buffName = {
  id: "01a06193-6ca5-7e1f-b411-54b1704f29e2",
  type: "page-type/text-property",
  slug: "buff-name",
  propertySlug: "buff",
  definition: "the helpful effect an effect puts on its target",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
