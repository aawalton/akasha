import type { Readout } from "../../../../readouts/readout.page-type.types.ts"

export const attributeConstitution = {
  id: "01a06838-9486-7039-a5b5-f3b864bb2160",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "attribute-constitution",
  definition: "the points Alan earned on a day for the whole plants he ate",
  code: "ts",
  test: "ts",
  label: "Constitution",
  unit: "points",
  place: 3,
  scale: "attribute-points",
  attribute: "constitution",
  groups: ["attributes"],
  wireKey: "constitution",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the points the constitution attribute has for today.",
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
