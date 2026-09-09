import type { TextProperty } from "@akasha/pages/text-property"

export type GbwwWork = string

export const gbwwWork = {
  id: "01a0659f-93da-7012-81b6-4f403687e511",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "gbww-work",
  propertySlug: "work",
  definition: "the work a reading is taken from",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
