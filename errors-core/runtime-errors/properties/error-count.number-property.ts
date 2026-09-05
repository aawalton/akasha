import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Count = number

export const errorCount = {
  id: "01a05f3f-e3e0-79b8-92d7-8141ecd449e9",
  pageTypeSlug: "number-property",
  slug: "error-count",
  propertySlug: "count",
  definition: "how many times one error has been met",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report raises the count of the error the report is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A count is kept outside the commit.",
    },
    {
      invariantKind: "gap",
      statement: "An error naming no count has been met an unknown number of times.",
    },
    {
      invariantKind: "gap",
      statement: "A count is never guessed where no count was read.",
    },
    {
      invariantKind: "gap",
      statement: "A report arriving while another report raises the count is lost.",
    },
  ],
} as const satisfies NumberProperty
