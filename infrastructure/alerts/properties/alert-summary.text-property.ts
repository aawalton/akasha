import type { TextProperty } from "@akasha/pages/text-property"

export type AlertSummary = string

export const alertSummary = {
  id: "01a06755-0778-707f-9e4a-5ccb7cd1e5a0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "alert-summary",
  propertySlug: "summary",
  definition: "the line shown when an alert is raised",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A summary has the labels of the rule raising the alert.",
    },
    {
      invariantKind: "departure",
      statement: "A summary is written in a template.",
    },
    {
      invariantKind: "departure",
      statement: "An unraised alert reads as a template left unfilled.",
    },
  ],
} as const satisfies TextProperty
