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
    {
      decisionKind: "decision-kind/departure",
      statement: "A station filleting fish deconstructs and researches nothing on that visit.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.857Z",
  updatedAt: "2026-10-10T14:24:25.659Z",
} as const satisfies Module
