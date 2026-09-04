import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SfrScore = number

export const sfrScore = {
  id: "01a0657e-2bc0-716f-a6c4-53b659cdb799",
  pageTypeSlug: "number-property",
  slug: "sfr-score",
  propertySlug: "sfr-score",
  definition: "how much stimulus the movement returns for the fatigue it costs",
  max: null,
} as const satisfies NumberProperty
