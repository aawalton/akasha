import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const collectibleCategoryParent = {
  id: "01a0cadf-2a12-7d7d-97d2-9131af6aeefa",
  type: "page-type/relation-property",
  slug: "collectible-category-parent",
  propertySlug: "parent",
  definition: "the category a collectible category hangs beneath",
  targetPageType: "page-type/temper-collectible-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no category above it is a heading.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
