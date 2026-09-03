import type { TextProperty } from "@akasha/pages-system/text-property"

export type GbwwSection = string

export const gbwwSection = {
  id: "01a0659f-93da-7013-a2b0-ec1167a77946",
  pageTypeSlug: "text-property",
  slug: "gbww-section",
  propertySlug: "section",
  definition: "how much of the work a reading covers",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
