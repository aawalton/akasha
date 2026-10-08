import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const weaponSkillLine = {
  id: "01a0cb2e-0434-7a8e-be83-9c7ddc9f01aa",
  type: "page-type/relation-property",
  slug: "weapon-skill-line",
  propertySlug: "weapon-skill-line-id",
  definition: "the companion line a weapon pairing is fought with",
  targetPageType: "page-type/temper-companion-skill-line",
  types: "ts",
  createdAt: "2026-09-22T22:13:05.716Z",
  updatedAt: "2026-09-22T22:13:28.000Z",
} as const satisfies RelationProperty
