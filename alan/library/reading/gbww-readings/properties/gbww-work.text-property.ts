import type { TextProperty } from "@akasha/pages-system/text-property"

export type GbwwWork = string

export const gbwwWork = {
  id: "01a0659f-93da-7012-81b6-4f403687e511",
  pageTypeSlug: "text-property",
  slug: "gbww-work",
  propertySlug: "work",
  definition: "the work a reading is taken from",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
