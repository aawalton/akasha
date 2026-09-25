import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const gbwwPlanYear = {
  id: "01a0659f-93da-7015-a84a-cfc2a413af20",
  type: "page-type/number-property",
  slug: "gbww-plan-year",
  propertySlug: "plan-year",
  definition: "which of the plan's ten years holds a reading",
  max: 10,
  types: "ts",
} as const satisfies NumberProperty
