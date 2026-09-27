import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const slotEquipType = {
  id: "01a0e11a-058e-7d90-a71c-7f1d20c2a965",
  type: "page-type/relation-property",
  slug: "slot-equip-type",
  propertySlug: "slot-equip-type",
  definition: "the equip type the game gives a piece worn in a slot or of a kind",
  targetPageType: "page-type/temper-equip-type",
  types: "ts",
} as const satisfies RelationProperty
