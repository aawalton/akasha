import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoCompanionId = number

export const esoCompanionId = {
  id: "01a05fcf-2468-705a-8ce6-cfcfa9a91f98",
  pageTypeSlug: "number-property",
  slug: "eso-companion-id",
  propertySlug: "eso-companion-id",
  definition: "the number The Elder Scrolls Online names a companion by",
  max: null,
} as const satisfies NumberProperty
