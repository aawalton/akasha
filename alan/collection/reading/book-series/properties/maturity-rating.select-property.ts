import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const maturityRating = {
  id: "01a06598-222b-7001-a964-8dd2fc87d5bc",
  type: "page-type/select-property",
  slug: "maturity-rating",
  propertySlug: "maturity-rating",
  definition: "how grown-up the provider says a series is",
  values: ["PG", "PG-13", "R"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rating is the provider's judgement rather than Alan's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A series the provider rated not at all states no rating.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:47:44.171Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies SelectProperty
