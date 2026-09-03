import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Stars = number

export const stars = {
  id: "01a06596-f0d5-7000-9936-5b8c14380ae2",
  pageTypeSlug: "number-property",
  slug: "stars",
  propertySlug: "stars",
  definition: "how many stars a card has been raised to",
  max: null,
} as const satisfies NumberProperty
