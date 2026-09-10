import type { Readout } from "../../../../readouts/readout.page-type.types.ts"

export const attributeStrength = {
  id: "01a06838-9421-7f89-932a-569d681c18a4",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "attribute-strength",
  definition: "the points Alan earned on a day for the weight he moved",
  code: "ts",
  test: "ts",
  label: "Strength",
  unit: "points",
  place: 1,
  scale: "attribute-points",
  attribute: "strength",
  groups: ["attributes"],
  wireKey: "strength",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the strength attribute has for today.",
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
