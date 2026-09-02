import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BreathingPoints = number

export const breathingPoints = {
  id: "01a05fd8-c30f-7307-a55a-3dae8d739e3b",
  pageTypeSlug: "number-property",
  slug: "breathing-points",
  propertySlug: "breathing-points",
  definition: "the breathing earned on a day",
  max: null,
} as const satisfies NumberProperty
