import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const countedFrom = {
  id: "01a0d4a9-9918-7438-96d4-7f5c46c114fb",
  type: "page-type/relation-property",
  slug: "counted-from",
  propertySlug: "counted-from",
  definition: "the property of a day's page a readout's count is read from",
  targetPageType: "page-type/page-property",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is read under the key the property states rather than its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating a day it is counted on states the property it is counted from.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
