import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FailedCount = number

export const failedCount = {
  id: "01a06861-f664-79a4-bf61-064bcd7e6204",
  pageTypeSlug: "number-property",
  slug: "failed-count",
  propertySlug: "failed-count",
  definition: "how many items a pull could not take",
  max: null,
} as const satisfies NumberProperty
