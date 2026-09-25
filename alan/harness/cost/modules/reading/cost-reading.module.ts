import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const costReading = {
  id: "01a08b9c-abbc-7be3-b86c-29165739234a",
  type: "page-type/module",
  slug: "cost-reading",
  definition: "the cost of Alan's open block, taken and kept on the cost readout",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cost is kept beside the readout the cost was taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How to read a block's cost is on the readout's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No open session is no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open session missing either level is no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout is the one whose page names this module as serving it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The cost itself is never printed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
