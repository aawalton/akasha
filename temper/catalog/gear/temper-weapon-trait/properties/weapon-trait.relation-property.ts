import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const weaponTrait = {
  id: "01a0c9d0-2b35-71f8-aaaa-31805bea8440",
  type: "page-type/relation-property",
  slug: "weapon-trait",
  propertySlug: "weapon-trait",
  definition: "a slug naming a trait worked into a weapon",
  targetPageType: "page-type/temper-weapon-trait",
  types: "ts",
  createdAt: "2026-09-22T15:50:58.101Z",
  updatedAt: "2026-09-22T15:55:27.000Z",
} as const satisfies RelationProperty
