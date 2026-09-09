import type { Readout } from "../../../../readouts/readout.page-type.ts"

export const attributeWisdom = {
  id: "01a06838-94ae-75cc-850c-98f366cb8269",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "attribute-wisdom",
  definition: "the points Alan earned on a day for the words he added about himself",
  code: "ts",
  test: "ts",
  label: "Wisdom",
  unit: "points",
  place: 4,
  scale: "attribute-points",
  attribute: "wisdom",
  groups: ["attributes"],
  wireKey: "wisdom",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the wisdom attribute has for today.",
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
