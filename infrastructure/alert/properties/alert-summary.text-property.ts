import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const alertSummary = {
  id: "01a06755-0778-707f-9e4a-5ccb7cd1e5a0",
  type: "page-type/text-property",
  slug: "alert-summary",
  propertySlug: "summary",
  definition: "the line shown when an alert is raised",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A summary has the labels of the rule raising the alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A summary is written in a template.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unraised alert reads as a template left unfilled.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
