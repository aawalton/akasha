import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MobilityReadingValueNum = number

export const mobilityReadingValueNum = {
  id: "01a06558-36e9-7e9e-9c9b-5166a2ede396",
  pageTypeSlug: "number-property",
  slug: "mobility-reading-value-num",
  propertySlug: "mobility-reading-value-num",
  definition: "the reading as a number, where the metric has one",
  max: null,
} as const satisfies NumberProperty
