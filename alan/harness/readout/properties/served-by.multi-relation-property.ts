import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const servedBy = {
  id: "01a0d977-e159-7bbe-aef9-c4617aa126c9",
  type: "page-type/multi-relation-property",
  slug: "served-by",
  propertySlug: "served-by",
  definition: "the code that responds with a readout or a group of readouts",
  targetPageType: "page-type/domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Code finds the readout or group it answers with by this relation to its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No code names the readout or group it answers with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route or module answering with a readout or group is named here once.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T16:48:27.481Z",
  updatedAt: "2026-10-30T16:14:25.650Z",
} as const satisfies MultiRelationProperty
