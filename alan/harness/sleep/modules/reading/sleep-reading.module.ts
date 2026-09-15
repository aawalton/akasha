import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sleepReading = {
  id: "01a069b3-8f5a-7bff-bb12-ccc087280c99",
  type: "module",
  slug: "sleep-reading",
  definition: "the hours Alan slept, taken from his day and kept on the sleep readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hours are kept beside the readout the hours were taken for.",
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
      statement: "The question to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no sleep is no reading rather than a reading of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's sleep hours are a sum over that day's stretches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sum over no stretches is absent rather than zero.",
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
      statement: "The hours themselves are never printed.",
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
