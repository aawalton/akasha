import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchFillet = {
  id: "01a12633-683c-7339-b19f-96b5a5304e50",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-fillet",
  definition: "filleting fish at a provisioning station by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a provisioning station fillets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a fish is filleted, as the game's own fillet list holds only fish.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fish in the backpack and the bank are filleted in one message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Filleting asks first only where the player's settings ask before filleting.",
    },
  ],
  createdAt: "2026-10-10T14:24:25.659Z",
  updatedAt: "2026-10-10T14:24:25.659Z",
} as const satisfies Module
