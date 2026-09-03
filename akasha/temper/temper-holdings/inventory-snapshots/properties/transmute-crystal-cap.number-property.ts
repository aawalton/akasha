import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TransmuteCrystalCap = number

export const transmuteCrystalCap = {
  id: "01a0675a-f185-7570-a5b7-efee09714208",
  pageTypeSlug: "number-property",
  slug: "transmute-crystal-cap",
  propertySlug: "transmute-crystal-cap",
  definition: "the most transmute crystals an account may hold",
  max: null,
} as const satisfies NumberProperty
