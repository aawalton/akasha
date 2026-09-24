import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const quoteSpeaker = {
  id: "01a0c94a-647f-7d21-bdd1-dfda11d8dfcf",
  type: "page-type/text-property",
  slug: "quote-speaker",
  propertySlug: "speaker",
  definition: "who said the line a quote entry keeps",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
