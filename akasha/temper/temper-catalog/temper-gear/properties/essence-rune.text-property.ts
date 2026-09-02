import type { TextProperty } from "@akasha/pages-system/text-property"

export type EssenceRune = string

export const essenceRune = {
  id: "01a05fcc-41f2-7de9-816e-7c90d5a24ce7",
  pageTypeSlug: "text-property",
  slug: "essence-rune",
  propertySlug: "essence-rune",
  definition: "the rune deciding which enchant a glyph carries",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
