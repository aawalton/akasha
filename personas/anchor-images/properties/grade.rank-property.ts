import type { Rank } from "akasha/alan/collections/properties/rank.rank-property.types.ts"
import type { RankProperty } from "akasha/pages/rank-properties/rank-property.page-type.types.ts"

export type Grade = Rank

export const grade = {
  id: "01a0655b-4a9b-7003-a822-f4a3ceda67b2",
  pageTypeSlug: "rank-property",
  type: "rank-property",
  slug: "grade",
  propertySlug: "grade",
  definition: "Alan's mark for how well a picture caught the persona",
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
      statement: "A grade is marked on the ladder a rank is marked on.",
    },
  ],
} as const satisfies RankProperty
