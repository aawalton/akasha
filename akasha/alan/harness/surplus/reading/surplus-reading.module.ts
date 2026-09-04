import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const surplusReading = {
  id: "01a069bb-b921-759e-92f7-2095b2099a24",
  pageTypeSlug: "module",
  slug: "surplus-reading",
  definition: "the surplus hours left of Alan's night, taken from his day and kept on its readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus is kept beside the readout the surplus was taken for.",
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
      statement: "A surplus is the sleep hours a day holds less the spend hours that day holds.",
    },
    {
      invariantKind: "departure",
      statement: "A day holding neither sleep hours nor spend hours is absent rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no surplus is no reading rather than a reading of zero.",
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
      statement: "No query for a day is composed here.",
    },
    {
      invariantKind: "absence",
      statement: "The surplus itself is never printed.",
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
