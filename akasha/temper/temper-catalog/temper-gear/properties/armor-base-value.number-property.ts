import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ArmorBaseValue = number

export const armorBaseValue = {
  id: "01a05fd1-d435-7668-b188-cb30d1aa4efe",
  pageTypeSlug: "number-property",
  slug: "armor-base-value",
  propertySlug: "base-value",
  definition: "the armor one piece of a weight gives before its kind is counted",
  max: null,
} as const satisfies NumberProperty
