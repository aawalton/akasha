import type { TextProperty } from "@akasha/pages-system/text-property"

export type GbwwPlanKey = string

export const gbwwPlanKey = {
  id: "01a0659f-93da-7014-a958-37368115b1aa",
  pageTypeSlug: "text-property",
  slug: "gbww-plan-key",
  propertySlug: "plan-key",
  definition: "the name the plan gives a reading",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
