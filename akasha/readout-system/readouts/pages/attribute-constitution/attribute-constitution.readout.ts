import type { Readout } from "../../readout.page-type.ts"

export const attributeConstitution = {
  id: "01a06838-9486-7039-a5b5-f3b864bb2160",
  pageTypeSlug: "readout",
  slug: "attribute-constitution",
  definition: "the points Alan earned on a day for the whole plants he ate",
  code: "ts",
  label: "Constitution",
  unit: "points",
  place: 3,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "constitution",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the grams of whole plants the day carries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "The nutrition figure a day carries holds grams rather than points.",
    },
    {
      invariantKind: "departure",
      statement: "A hundred grams of whole plants eaten is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a constitution of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no grams is no reading rather than a constitution of zero.",
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
