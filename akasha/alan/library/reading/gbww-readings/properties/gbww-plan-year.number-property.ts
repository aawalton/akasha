import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GbwwPlanYear = number

export const gbwwPlanYear = {
  id: "01a0659f-93da-7015-a84a-cfc2a413af20",
  pageTypeSlug: "number-property",
  slug: "gbww-plan-year",
  propertySlug: "plan-year",
  definition: "which of the plan's ten years a reading falls in",
  max: 10,
} as const satisfies NumberProperty
