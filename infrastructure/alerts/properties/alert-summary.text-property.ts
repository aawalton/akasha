import type { TextProperty } from "@akasha/pages-system/text-property"

export type AlertSummary = string

export const alertSummary = {
  id: "01a06755-0778-707f-9e4a-5ccb7cd1e5a0",
  pageTypeSlug: "text-property",
  slug: "alert-summary",
  propertySlug: "summary",
  definition: "the line shown when an alert is raised",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A summary carries the labels of the rule raising it, written in a template.",
    },
    {
      invariantKind: "departure",
      statement: "A template left unfilled is what an unraised alert reads as.",
    },
  ],
} as const satisfies TextProperty
