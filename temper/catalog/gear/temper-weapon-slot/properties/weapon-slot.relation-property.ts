import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const weaponSlot = {
  id: "01a0c9dc-75cb-7d5b-9d92-a47a3436b95b",
  type: "page-type/relation-property",
  slug: "weapon-slot",
  propertySlug: "weapon-slot",
  definition: "a slug naming a hand or a bar holding a weapon",
  targetPageType: "page-type/temper-weapon-slot",
  types: "ts",
} as const satisfies RelationProperty
