import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillLineCategory = {
  id: "01a0cb10-f698-706a-a7c8-2193c2080c04",
  type: "page-type/relation-property",
  slug: "skill-line-category",
  propertySlug: "category",
  definition: "the group of skill lines a skill line belongs to",
  targetPageType: "page-type/temper-skill-line-category",
  types: "ts",
  createdAt: "2026-09-22T21:41:21.688Z",
  updatedAt: "2026-10-30T16:45:43.728Z",
} as const satisfies RelationProperty
