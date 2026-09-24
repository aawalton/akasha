import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const titleColoredBy = {
  id: "01a0d40d-2941-7693-93c0-3a777712b8b2",
  type: "page-type/relation-property",
  slug: "title-colored-by",
  propertySlug: "title-colored-by",
  definition: "the property whose color draws the titles of pages of this type",
  targetPageType: "page-type/page-property",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The property named holds a relation to a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming none takes the one the page type it extends names.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
