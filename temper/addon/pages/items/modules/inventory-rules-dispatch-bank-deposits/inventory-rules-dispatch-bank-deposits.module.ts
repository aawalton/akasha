import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankDeposits = {
  id: "01a06258-b530-7646-901c-b102e187b412",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-deposits",
  definition: "depositing items into the bank by rule, reserving slots as it goes",
  code: "ts",
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
      statement:
        "What another character holds toward a stocking rule is read from that character's last capture.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "That holding is counted by the item deposited rather than by the whole rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stock past what the bank takes stays carried until a visit reaches the tier below the bank.",
    },
  ],
} as const satisfies Module
