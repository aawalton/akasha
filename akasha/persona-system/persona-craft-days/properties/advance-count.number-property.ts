import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AdvanceCount = number

export const advanceCount = {
  id: "01a0655b-4a9b-7007-8688-e6360abfa930",
  pageTypeSlug: "number-property",
  slug: "advance-count",
  propertySlug: "advance-count",
  definition: "how many steps the craft moved forward on a day",
  max: null,
} as const satisfies NumberProperty
