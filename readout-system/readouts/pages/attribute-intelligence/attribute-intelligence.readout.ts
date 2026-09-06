import type { Readout } from "../../readout.page-type.ts"

export const attributeIntelligence = {
  id: "01a06838-94d9-7c36-b921-4351c8db6033",
  pageTypeSlug: "readout",
  slug: "attribute-intelligence",
  definition: "the points Alan earned on a day for the learn-everything topics he updated",
  code: "ts",
  test: "ts",
  label: "Intelligence",
  unit: "points",
  place: 5,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "intelligence",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the learn-everything topics Alan updated turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "Four topics updated is one point.",
    },

    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than an intelligence of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no count is no reading rather than an intelligence of zero.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the topics a commit updated.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout
