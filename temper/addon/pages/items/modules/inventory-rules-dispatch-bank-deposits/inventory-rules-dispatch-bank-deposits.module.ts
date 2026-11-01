import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankDeposits = {
  id: "01a06258-b530-7646-901c-b102e187b412",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-deposits",
  definition: "depositing items into the bank by rule, reserving slots as it goes",
  code: "ts",
  parts: ["module/inventory-stock-handoff"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item joins a stack of its own in storage where one has room, whatever action sent it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item storage has no room for leaves the deposits after it alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stock for the other characters is handed off through the capped tier the visit reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fill tier naming a character hands off stock to that character alone.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stock past what the bank takes stays carried until a visit reaches the tier below the bank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock rule's lowest-priority items are banked first, so its first-listed stay.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house storage visit deposits nothing unless the storage carrier is playing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The carrier banks the stock a house chest holds for the others, and keeps it from the chest.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.856Z",
  updatedAt: "2026-11-01T19:58:07.808Z",
} as const satisfies Module
