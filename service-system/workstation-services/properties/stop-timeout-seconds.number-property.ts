import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StopTimeoutSeconds = number

export const stopTimeoutSeconds = {
  id: "01a06738-9f12-70bf-96f0-63fd765565bc",
  pageTypeSlug: "number-property",
  slug: "stop-timeout-seconds",
  propertySlug: "stop-timeout-seconds",
  definition: "how long a unit is given to stop before it is killed",
  max: null,
} as const satisfies NumberProperty
