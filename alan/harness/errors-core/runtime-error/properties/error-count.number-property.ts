import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const errorCount = {
  id: "01a05f3f-e3e0-79b8-92d7-8141ecd449e9",
  type: "page-type/number-property",
  slug: "error-count",
  propertySlug: "count",
  definition: "how many times an error has been met",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A report raises the count of the error the report is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error naming no count has been met an unknown number of times.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is never guessed where no count was read.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A report arriving while another report raises the count is lost.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
