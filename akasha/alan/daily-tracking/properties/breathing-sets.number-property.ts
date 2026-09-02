import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BreathingSets = number

export const breathingSets = {
  id: "01a05fd8-c30f-7fab-86ad-e99ced74fd51",
  pageTypeSlug: "number-property",
  slug: "breathing-sets",
  propertySlug: "breathing-sets",
  definition: "how many rounds of breathing a stretch of time held",
  max: null,
} as const satisfies NumberProperty
