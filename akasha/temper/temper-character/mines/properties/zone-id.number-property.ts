import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ZoneId = number

export const zoneId = {
  id: "01a05fcd-f556-7772-87a0-2f629e7c9527",
  pageTypeSlug: "number-property",
  slug: "zone-id",
  propertySlug: "zone-id",
  definition: "the number the game names a zone by",
  max: null,
} as const satisfies NumberProperty
