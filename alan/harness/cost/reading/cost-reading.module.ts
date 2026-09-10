import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const costReading = {
  id: "01a08b9c-abbc-7be3-b86c-29165739234a",
  pageTypeSlug: "module",
  type: "module",
  slug: "cost-reading",
  definition: "the cost of Alan's open block, taken and kept on the cost readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The cost is kept beside the readout the cost was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      invariantKind: "departure",
      statement: "How to read a block's cost is on the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "No open session is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "An open session missing either level is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The cost itself is never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
