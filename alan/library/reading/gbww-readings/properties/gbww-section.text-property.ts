import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GbwwSection = string

export const gbwwSection = {
  id: "01a0659f-93da-7013-a2b0-ec1167a77946",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "gbww-section",
  propertySlug: "section",
  definition: "how much of the work a reading covers",
  maxLength: 300,
  nameFormat: null,
} as const satisfies TextProperty
