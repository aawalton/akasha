import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StrengthVolume = number

export const strengthVolume = {
  id: "01a05fd8-c30f-7ffd-979b-9b7287f4e97b",
  pageTypeSlug: "number-property",
  slug: "strength-volume",
  propertySlug: "strength-volume",
  definition: "the pounds Alan moved through a repetition, summed over a day",
  max: null,
} as const satisfies NumberProperty
