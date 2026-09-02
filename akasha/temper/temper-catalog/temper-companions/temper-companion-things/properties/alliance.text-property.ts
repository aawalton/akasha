import type { TextProperty } from "@akasha/pages-system/text-property"

export type Alliance = string

export const alliance = {
  id: "01a05fcf-2468-7229-a1a7-015a775866de",
  pageTypeSlug: "text-property",
  slug: "alliance",
  propertySlug: "alliance",
  definition: "the alliance a companion belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
