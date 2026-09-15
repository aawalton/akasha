import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surplusReading = {
  id: "01a069bb-b921-759e-92f7-2095b2099a24",
  type: "page-type/module",
  slug: "surplus-reading",
  definition: "the surplus hours left of Alan's night, taken from his day and kept on its readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The surplus is kept beside the readout the surplus was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day read is the day Alan opened rather than the day on the clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day moved into akasha is read from akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The query to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus is a day's sleep hours less that day's spend hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How fast the surplus falls with the clock is kept beside the surplus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That rate is read off the same day the surplus was read off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day holding neither sleep hours nor spend hours is absent rather than zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no surplus is no reading rather than a reading of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day that could not be read is a refusal rather than an absent reading.",
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
      statement: "No query for a day is composed here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The surplus itself is never printed.",
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
