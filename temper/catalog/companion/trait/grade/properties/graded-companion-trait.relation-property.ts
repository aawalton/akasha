import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gradedCompanionTrait = {
  id: "01a0d3e2-bb32-70b8-b371-3da4b0ed72f0",
  type: "page-type/relation-property",
  slug: "graded-companion-trait",
  propertySlug: "thing",
  definition: "the companion trait a grade is of",
  targetPageType: "page-type/temper-companion-trait",
  types: "ts",
} as const satisfies RelationProperty
