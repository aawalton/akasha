import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SetMaxEquip = number

export const setMaxEquip = {
  id: "01a05fcd-f555-7778-a87a-87338b2f1827",
  pageTypeSlug: "number-property",
  slug: "set-max-equip",
  propertySlug: "set-max-equip",
  definition: "how many pieces of a set count towards its bonuses",
  max: null,
} as const satisfies NumberProperty
