import type { Readout } from "../../readout.page-type.ts"

export const attributeEndurance = {
  id: "01a06838-945f-7ac6-b3a4-411fa111e195",
  pageTypeSlug: "readout",
  slug: "attribute-endurance",
  definition: "the points Alan earned on a day for the calories he burned moving",
  code: "ts",
  test: "ts",
  label: "Endurance",
  unit: "points",
  place: 2,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "endurance",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the active calories the tracking day carries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "Four hundred calories burned moving is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than an endurance of zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day carrying no active calories is no reading rather than an endurance of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout
