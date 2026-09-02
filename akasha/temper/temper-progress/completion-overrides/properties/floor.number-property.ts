import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Floor = number

export const floor = {
  id: "01a05fd0-3aa7-76f5-ab2b-a337ac2add83",
  pageTypeSlug: "number-property",
  slug: "floor",
  propertySlug: "floor",
  definition: "the least a count is held to be, whatever the game reports",
  max: null,
} as const satisfies NumberProperty
