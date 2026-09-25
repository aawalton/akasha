import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const startSymbol = {
  id: "01a0c595-f8ed-761d-b0c8-7fd9abecd9ba",
  type: "page-type/relation-property",
  slug: "start-symbol",
  propertySlug: "start-symbol",
  definition: "the phrase kind parsing this property's text",
  targetPageType: "page-type/phrase-kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each property states where the grammar starts rather than sharing one start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming no start symbol is a property the grammar judges nothing of.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
