import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StartTimeoutSeconds = number

export const startTimeoutSeconds = {
  id: "01a05a3f-b42f-74b6-a5ad-699b142a7d0b",
  pageTypeSlug: "number-property",
  slug: "start-timeout-seconds",
  propertySlug: "start-timeout-seconds",
  definition: "how long a unit is given to finish starting",
  max: null,
} as const satisfies NumberProperty
