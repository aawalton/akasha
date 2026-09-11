import type { RankProperty } from "akasha/pages/rank-properties/rank-property.page-type.types.ts"

export const singability = {
  id: "01a06243-144b-700b-83e8-f1b91786511f",
  type: "rank-property",
  slug: "singability",
  propertySlug: "singability",
  definition: "Alan's grade for how well a song sits in his own voice",
  values: [
    "F",
    "D-",
    "D",
    "D+",
    "C-",
    "C",
    "C+",
    "B-",
    "B",
    "B+",
    "A-",
    "A",
    "A+",
    "S-",
    "S",
    "S+",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A singability is graded on the ladder a rank is graded on.",
    },
  ],
  types: "ts",
} as const satisfies RankProperty
