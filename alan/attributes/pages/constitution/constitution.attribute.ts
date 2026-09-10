import type { Attribute } from "../../attribute.page-type.types.ts"

export const constitution = {
  id: "01a06841-a158-76c3-9089-9842c06dc7c0",
  pageTypeSlug: "attribute",
  type: "attribute",
  slug: "constitution",
  definition: "what Alan has built by eating whole plants",
  pointUnit: "100 grams of whole plants eaten",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hundred grams of whole plants eaten is one point.",
    },
    {
      invariantKind: "departure",
      statement: "The points are the plant grams of the day's food entries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "The grams turned into points are the grams the plants readout counts.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window the entries are counted over is handed in rather than worked out here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a figure the tracking day has.",
    },
  ],
} as const satisfies Attribute
