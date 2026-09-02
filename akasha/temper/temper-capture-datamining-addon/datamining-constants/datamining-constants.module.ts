import type { Module } from "@akasha/code-system/module"

export const dataminingConstants = {
  id: "01a06341-d9e8-7002-a0ab-0c2c0932a9ad",
  pageTypeSlug: "module",
  slug: "datamining-constants",
  definition: "the fixed names, batch sizes and delays datamining runs by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Mining stops after a stated run of consecutive empty ids.",
    },
    {
      invariantKind: "departure",
      statement: "Item mining states a batch size of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Quest mining states a batch size of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An item is reached by a link built from a template rather than by an api call.",
    },
  ],
} as const satisfies Module
