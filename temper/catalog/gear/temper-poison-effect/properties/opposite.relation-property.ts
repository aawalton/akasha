import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const opposite = {
  id: "01a05fd1-d43d-7ade-8dad-6cb14825b926",
  type: "page-type/relation-property",
  slug: "opposite",
  propertySlug: "opposite",
  definition: "the alchemy effect undoing what this one does",
  targetPageType: "page-type/temper-poison-effect",
  types: "ts",
} as const satisfies RelationProperty
