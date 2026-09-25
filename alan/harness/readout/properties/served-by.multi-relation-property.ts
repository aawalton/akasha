import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const servedBy = {
  id: "01a0d977-e159-7bbe-aef9-c4617aa126c9",
  type: "page-type/multi-relation-property",
  slug: "served-by",
  propertySlug: "served-by",
  definition: "the routes and modules answering with a readout or a group",
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
} as const satisfies MultiRelationProperty
