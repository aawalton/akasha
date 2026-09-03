import type { Readout } from "../../readout.page-type.ts"

export const attributeWisdom = {
  id: "01a06838-94ae-75cc-850c-98f366cb8269",
  pageTypeSlug: "readout",
  slug: "attribute-wisdom",
  definition: "the points Alan earned on a day for the words he added about himself",
  code: "ts",
  label: "Wisdom",
  unit: "points",
  place: 4,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "wisdom",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the words about Alan the day carries turned into points.",
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
      statement: "No tracking day is no reading rather than a wisdom of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no words is no reading rather than a wisdom of zero.",
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
