import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const heldRank = {
  id: "01a10362-78a2-70ae-8add-8029ccf1cde9",
  type: "page-type/relation-property",
  slug: "held-rank",
  propertySlug: "rank",
  definition: "the world's rank a rank held is a holding of",
  targetPageType: "page-type/world-rank",
  types: "ts",
} as const satisfies RelationProperty
