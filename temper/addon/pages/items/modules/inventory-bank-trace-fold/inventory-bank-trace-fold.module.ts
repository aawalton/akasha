import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBankTraceFold = {
  id: "01a06258-b528-7c01-a1ff-06f7e3a14a57",
  type: "page-type/module",
  slug: "inventory-bank-trace-fold",
  definition: "folding net-worth walks and settling brackets from a venue trace into totals",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The remainder subtracts only brackets that nest inside no other bracket.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Building facts and judging the ordered rules both sit inside judging a slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an open handler spent sits inside that handler's own time already.",
    },
  ],
} as const satisfies Module
