import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingConstants = {
  id: "01a06341-d9e8-7002-a0ab-0c2c0932a9ad",
  type: "page-type/module",
  slug: "datamining-constants",
  definition: "datamining's fixed batch sizes and delays",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Mining stops after a stated run of consecutive empty ids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Item mining states a batch size of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Quest mining states a batch size of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is reached by a link built from a template rather than by an api call.",
    },
  ],
} as const satisfies Module
