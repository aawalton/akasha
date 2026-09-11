import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const maturityRating = {
  id: "01a06598-222b-7001-a964-8dd2fc87d5bc",
  type: "select-property",
  slug: "maturity-rating",
  propertySlug: "maturity-rating",
  definition: "how grown-up the provider says a series is",
  values: ["PG", "PG-13", "R"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rating is the provider's judgement rather than Alan's.",
    },
    {
      invariantKind: "departure",
      statement: "A series the provider rated not at all states no rating.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
