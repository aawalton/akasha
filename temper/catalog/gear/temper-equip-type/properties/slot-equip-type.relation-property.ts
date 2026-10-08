import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const slotEquipType = {
  id: "01a0e11a-058e-7d90-a71c-7f1d20c2a965",
  type: "page-type/relation-property",
  slug: "slot-equip-type",
  propertySlug: "slot-equip-type",
  definition: "the equip type the game gives a piece worn in a slot or of a kind",
  targetPageType: "page-type/temper-equip-type",
  types: "ts",
  createdAt: "2026-09-27T04:22:54.094Z",
  updatedAt: "2026-09-27T04:23:12.000Z",
} as const satisfies RelationProperty
