import type { Readout } from "../../../../readouts/readout.page-type.ts"

export const attributeEndurance = {
  id: "01a06838-945f-7ac6-b3a4-411fa111e195",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "attribute-endurance",
  definition: "the points Alan earned on a day for the calories he burned moving",
  code: "ts",
  test: "ts",
  label: "Endurance",
  unit: "points",
  place: 2,
  scale: "attribute-points",
  attribute: "endurance",
  groups: ["attributes"],
  wireKey: "endurance",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the endurance attribute has for today.",
    },
    {
      invariantKind: "departure",
      statement: "The attribute is reached through the link this readout names.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute with no points today is no reading rather than a zero.",
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
