import type { NumberProperty } from "@akasha/pages-system/number-property"

export type IntervalSeconds = number

export const intervalSeconds = {
  id: "01a06738-9f12-7e59-9fff-978b39b62841",
  pageTypeSlug: "number-property",
  slug: "interval-seconds",
  propertySlug: "interval-seconds",
  definition: "how long after its last start a timer runs again",
  max: null,
} as const satisfies NumberProperty
