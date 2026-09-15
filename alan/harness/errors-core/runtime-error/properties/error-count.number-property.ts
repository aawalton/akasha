import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const errorCount = {
  id: "01a05f3f-e3e0-79b8-92d7-8141ecd449e9",
  type: "page-type/number-property",
  slug: "error-count",
  propertySlug: "count",
  definition: "how many times one error has been met",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A report raises the count of the error the report is filed under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count is kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An error naming no count has been met an unknown number of times.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A count is never guessed where no count was read.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A report arriving while another report raises the count is lost.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
