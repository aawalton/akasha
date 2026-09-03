import type { Readout } from "../../readout.page-type.ts"

export const attributeIntelligence = {
  id: "01a06838-94d9-7c36-b921-4351c8db6033",
  pageTypeSlug: "readout",
  slug: "attribute-intelligence",
  definition: "the points Alan earned on a day for the words he added about what he is learning",
  code: "ts",
  label: "Intelligence",
  unit: "points",
  place: 5,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "intelligence",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the words about what Alan is learning turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "Ten thousand words added is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than an intelligence of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no words is no reading rather than an intelligence of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "stopgap",
      statement: "Nothing writes those words onto a day yet.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the words a commit added.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout
