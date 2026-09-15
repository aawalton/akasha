import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const costReading = {
  id: "01a08b9c-abbc-7be3-b86c-29165739234a",
  type: "page-type/module",
  slug: "cost-reading",
  definition: "the cost of Alan's open block, taken and kept on the cost readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cost is kept beside the readout the cost was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How to read a block's cost is on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No open session is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An open session missing either level is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The cost itself is never printed.",
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
