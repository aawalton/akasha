import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const mergedInto = {
  id: "01a0b751-74f6-7516-a911-7d58d348079b",
  type: "page-type/relation-property",
  slug: "merged-into",
  propertySlug: "merged-into",
  definition: "the character another character was drawn together with",
  targetPageType: "page-type/world-character",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two characters a story draws together into one are two characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The earlier of the two states this, and the one drawn together with states nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating this keeps the claims read before the drawing together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character drawn together with is the one the story follows afterwards.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character offered this and refusing it states nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character stating this is not another name for the character named.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
