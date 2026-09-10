import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RestartDelaySeconds = number

export const restartDelaySeconds = {
  id: "01a05a3f-b42e-71bb-aaae-77ddc02c8745",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "restart-delay-seconds",
  propertySlug: "restart-delay-seconds",
  definition: "how long a unit waits before it is started again",
  max: null,
} as const satisfies NumberProperty
