import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const countedFrom = {
  id: "01a0d4a9-9918-7438-96d4-7f5c46c114fb",
  type: "page-type/relation-property",
  slug: "counted-from",
  propertySlug: "counted-from",
  definition: "the property of a day's page that holds the number a readout shows",
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
  createdAt: "2026-09-24T18:24:39.704Z",
  updatedAt: "2026-10-30T16:22:14.488Z",
} as const satisfies RelationProperty
