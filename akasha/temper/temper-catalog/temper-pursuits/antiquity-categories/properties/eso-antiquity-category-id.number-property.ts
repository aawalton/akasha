import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoAntiquityCategoryId = number

export const esoAntiquityCategoryId = {
  id: "01a06166-503b-7000-8733-81a510d764fc",
  pageTypeSlug: "number-property",
  slug: "eso-antiquity-category-id",
  propertySlug: "eso-antiquity-category-id",
  definition: "the number The Elder Scrolls Online names an antiquity category by",
  max: null,
} as const satisfies NumberProperty
