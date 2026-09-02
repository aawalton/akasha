import type { TextProperty } from "@akasha/pages-system/text-property"

export type ZoneName = string

export const zoneName = {
  id: "01a05fcd-f557-7382-a41e-b179ecebe6e0",
  pageTypeSlug: "text-property",
  slug: "zone-name",
  propertySlug: "zone-name",
  definition: "what a zone is called",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
