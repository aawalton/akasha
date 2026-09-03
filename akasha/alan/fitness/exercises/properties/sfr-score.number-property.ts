import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SfrScore = number

export const sfrScore = {
  id: "01a0657b-1ad2-7a6c-95ac-95d4143d500f",
  pageTypeSlug: "number-property",
  slug: "sfr-score",
  propertySlug: "sfr-score",
  definition: "how much stimulus the movement returns for the fatigue it costs",
  max: null,
} as const satisfies NumberProperty
