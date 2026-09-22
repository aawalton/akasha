import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const achievementCategoryParent = {
  id: "01a0cadf-1818-7cb0-a1c6-b0f22967104e",
  type: "page-type/relation-property",
  slug: "achievement-category-parent",
  propertySlug: "parent",
  definition: "the category an achievement category hangs beneath",
  targetPageType: "page-type/temper-achievement-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no category above it is a heading.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
