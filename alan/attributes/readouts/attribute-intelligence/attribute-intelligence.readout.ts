import type { Readout } from "../../../../readouts/readout.page-type.types.ts"

export const attributeIntelligence = {
  id: "01a06838-94d9-7c36-b921-4351c8db6033",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "attribute-intelligence",
  definition: "the points Alan earned on a day for the learn-everything topics he updated",
  code: "ts",
  test: "ts",
  label: "Intelligence",
  unit: "points",
  place: 5,
  scale: "attribute-points",
  attribute: "intelligence",
  groups: ["attributes"],
  wireKey: "intelligence",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the intelligence attribute has for today.",
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
