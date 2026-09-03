import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sleepReading = {
  id: "01a069b3-8f5a-7bff-bb12-ccc087280c99",
  pageTypeSlug: "module",
  slug: "sleep-reading",
  definition: "the hours Alan slept, taken from his day and kept on the sleep readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The hours are kept beside the readout the hours were taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A day moved into akasha is read from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "What to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no sleep is no reading rather than a reading of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day's sleep hours are a sum over that day's stretches.",
    },
    {
      invariantKind: "departure",
      statement: "A sum over no stretches is absent rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day that could not be read is a refusal rather than an absent reading.",
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
      statement: "The hours themselves are never printed.",
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
