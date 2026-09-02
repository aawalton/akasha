import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AbilityId = number

export const abilityId = {
  id: "01a05fcf-90fd-76f3-952b-b9bcb2e40c9d",
  pageTypeSlug: "number-property",
  slug: "ability-id",
  propertySlug: "ability-id",
  definition: "the number The Elder Scrolls Online names an ability by",
  max: null,
} as const satisfies NumberProperty
