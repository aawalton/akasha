import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EquipType = number

export const equipType = {
  id: "01a05fcc-694e-76a3-970f-ebb43b5adaf7",
  pageTypeSlug: "number-property",
  slug: "equip-type",
  propertySlug: "equip-type",
  definition: "the number the game gives a place a thing is worn",
  max: null,
} as const satisfies NumberProperty
