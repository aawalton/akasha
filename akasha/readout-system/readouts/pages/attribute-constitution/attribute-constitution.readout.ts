import type { Readout } from "../../readout.page-type.ts"

export const attributeConstitution = {
  id: "01a06838-9486-7039-a5b5-f3b864bb2160",
  pageTypeSlug: "readout",
  slug: "attribute-constitution",
  definition: "the points Alan earned on a day for the whole plants he ate",
  code: "ts",
  test: "ts",
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
      statement: "The reading is the plant grams of the day's food entries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "The grams turned into points are the grams the plants readout counts.",
    },
    {
      invariantKind: "departure",
      statement: "A hundred grams of whole plants eaten is one point.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window the entries are counted over is handed in rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A day holding no food entry is a reading of zero rather than no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a figure the tracking day carries.",
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
