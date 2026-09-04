import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const plantsReading = {
  id: "01a069bc-1aa2-7813-a0df-1f5eed5e0196",
  pageTypeSlug: "module",
  slug: "plants-reading",
  definition:
    "the grams of whole plants Alan ate, counted from his food entries and kept on the readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The grams are kept beside the readout the grams were counted for.",
    },
    {
      invariantKind: "departure",
      statement: "What to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The grams are a sum over food entries rather than a field on a tracking day.",
    },
    {
      invariantKind: "departure",
      statement:
        "The day a food entry counts to is worked out from the instant that entry happened at.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkout is asked directly rather than through the module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement:
        "A food entry is asked for as an akasha page rather than through the markdown client.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout's refusal is an answer that is not ok rather than a throw.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "departure",
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The grams themselves are never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
