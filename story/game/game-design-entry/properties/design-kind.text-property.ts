import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const designKind = {
  id: "01a0c93e-3762-7d37-9693-cbfcca51433c",
  type: "page-type/text-property",
  slug: "design-kind",
  propertySlug: "kind",
  definition: "the part of a game's design one entry settles",
  maxLength: 60,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
