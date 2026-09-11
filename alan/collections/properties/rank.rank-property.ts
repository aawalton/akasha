import type { RankProperty } from "akasha/pages/rank-properties/rank-property.page-type.types.ts"

export const rank = {
  id: "01a063de-2c60-7010-9c60-ca9b5e2b2eca",
  type: "rank-property",
  slug: "rank",
  propertySlug: "rank",
  definition: "how good a person found a collection",
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
  types: "ts",
} as const satisfies RankProperty
