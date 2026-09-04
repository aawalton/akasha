import type { Readout } from "../../readout.page-type.ts"

export const attributeStrength = {
  id: "01a06838-9421-7f89-932a-569d681c18a4",
  pageTypeSlug: "readout",
  slug: "attribute-strength",
  definition: "the points Alan earned on a day for the weight he moved",
  code: "ts",
  test: "ts",
  label: "Strength",
  unit: "points",
  place: 1,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "strength",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the pounds the tracking day carries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "A thousand kilograms moved is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A thousand kilograms is 2204.62 pounds.",
    },
    {
      invariantKind: "departure",
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a strength of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no pounds moved is no reading rather than a strength of zero.",
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
