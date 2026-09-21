import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankSlots = {
  id: "01a06258-b530-718c-b327-f3b5d5065cb4",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-slots",
  definition: "finding empty and partial slots in the bank and the backpack for a move",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A partial slot is offered for a move only where the slot takes the whole move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How much a move carries is named by the caller rather than assumed to be one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot offered once in a visit is reserved, so no second move is aimed at it.",
    },
  ],
} as const satisfies Module
