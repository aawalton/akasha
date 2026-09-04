import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GbwwReadingNumber = number

export const gbwwReadingNumber = {
  id: "01a0659f-93da-7016-92b4-231c8ff182a8",
  pageTypeSlug: "number-property",
  slug: "gbww-reading-number",
  propertySlug: "reading-number",
  definition: "where a reading stands in its year",
  max: null,
} as const satisfies NumberProperty
