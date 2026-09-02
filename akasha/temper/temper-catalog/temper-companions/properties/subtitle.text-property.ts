import type { TextProperty } from "@akasha/pages-system/text-property"

export type Subtitle = string

export const subtitle = {
  id: "01a05fcf-2467-75a6-9b17-83afd352a723",
  pageTypeSlug: "text-property",
  slug: "subtitle",
  propertySlug: "subtitle",
  definition: "the epithet a companion is known by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
