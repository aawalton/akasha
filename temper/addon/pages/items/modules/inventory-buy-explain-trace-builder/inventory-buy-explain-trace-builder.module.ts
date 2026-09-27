import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBuyExplainTraceBuilder = {
  id: "01a06258-b52a-7e48-bc42-a0098f52d636",
  type: "page-type/module",
  slug: "inventory-buy-explain-trace-builder",
  definition: "the trace written when buying is explained, one entry per rule buying its shortfall",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item named narrows the trace to the rules that take that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store is read as the buy at that store reads it.",
    },
  ],
} as const satisfies Module
