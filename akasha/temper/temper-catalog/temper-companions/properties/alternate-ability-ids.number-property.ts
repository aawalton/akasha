import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AlternateAbilityIds = number

export const alternateAbilityIds = {
  id: "01a05fcf-90fe-7ec6-b4f8-f8ff2bca5068",
  pageTypeSlug: "number-property",
  slug: "alternate-ability-ids",
  propertySlug: "alternate-ability-ids",
  definition: "another number the game names one ability by",
  max: null,
} as const satisfies NumberProperty
