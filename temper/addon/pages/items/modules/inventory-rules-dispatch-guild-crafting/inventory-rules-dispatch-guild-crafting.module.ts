import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchGuildCrafting = {
  id: "01a06258-b531-7efe-864b-ce4a1f797ba8",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-guild-crafting",
  definition:
    "what happens at a guild bank or a crafting station: research and deconstruction targets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A station crafts its writs first and the stocking rules' shortfalls after them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A station crafting anything deconstructs and researches nothing on that visit.",
    },
  ],
} as const satisfies Module
