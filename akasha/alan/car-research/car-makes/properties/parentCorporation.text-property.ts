import type { TextProperty } from "@akasha/pages-system/text-property"

export type ParentCorporation = string

export const parentCorporation = {
  id: "01a06598-aa80-7610-ab1b-b11bfdbfff7c",
  pageTypeSlug: "text-property",
  slug: "parentCorporation",
  propertySlug: "parentCorporation",
  definition: "the group the make belongs to",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
