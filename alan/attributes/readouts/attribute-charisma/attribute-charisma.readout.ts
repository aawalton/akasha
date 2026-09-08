import type { Readout } from "../../../../readouts/readouts/readout.page-type.ts"

export const attributeCharisma = {
  id: "01a06838-950f-7f4c-9f40-60cc35fa63f5",
  pageTypeSlug: "readout",
  slug: "attribute-charisma",
  definition: "the points Alan earned on a day for the hours with someone that cost him nothing",
  code: "ts",
  test: "ts",
  label: "Charisma",
  unit: "points",
  place: 6,
  scaleSlug: "attribute-points",
  attributeSlug: "charisma",
  groupSlugs: ["attributes"],
  wireKey: "charisma",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the charisma attribute carries for today.",
    },
    {
      invariantKind: "departure",
      statement: "The attribute is reached through the link this readout names.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute carrying no points today is no reading rather than a zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out what a day earned.",
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
