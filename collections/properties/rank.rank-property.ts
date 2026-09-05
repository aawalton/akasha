import type { RankProperty } from "@akasha/pages-system/rank-property"

export const rank = {
  id: "01a063de-2c60-7010-9c60-ca9b5e2b2eca",
  pageTypeSlug: "rank-property",
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
} as const satisfies RankProperty

export type Rank = (typeof rank.values)[number]
