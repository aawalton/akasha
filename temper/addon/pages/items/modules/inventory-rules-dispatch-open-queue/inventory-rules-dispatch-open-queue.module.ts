import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchOpenQueue = {
  id: "01a06258-b532-71fb-afd5-5f1ec8ac2594",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-open-queue",
  definition: "opening containers one at a time, with the loot window hooked while the queue runs",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stolen container opens while hidden, outside justice, or in an Outlaw's Refuge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A container without backpack room is passed over, and the run goes on to the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run that passed containers over says in chat how many and the free slots needed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same line is not said again until what it says changes.",
    },
  ],
  code: "ts",
} as const satisfies Module
