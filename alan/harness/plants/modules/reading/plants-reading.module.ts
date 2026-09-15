import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const plantsReading = {
  id: "01a069bc-1aa2-7813-a0df-1f5eed5e0196",
  type: "module",
  slug: "plants-reading",
  definition:
    "the grams of whole plants Alan ate, counted from his food entries and kept on the readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The grams are kept beside the readout the grams were counted for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The question to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The grams are a sum over food entries rather than a field on a tracking day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The day a food entry counts to is worked out from the instant that entry happened at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checkout is asked directly rather than through the module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A food entry is asked for as an akasha page rather than through the markdown client.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A checkout's refusal is an answer that is not ok rather than a throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The grams themselves are never printed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
