import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryStockGroup = {
  id: "01a12632-e598-795f-a94d-5ac9fbef31a2",
  type: "page-type/module",
  slug: "inventory-stock-group",
  definition: "the group a stocked backpack slot is counted in against its target",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock an ordered rule set is counted with every slot that rule stocks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock an item rule set is counted with every slot holding that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plan and the bank visit count a stock in the same group.",
    },
  ],
  createdAt: "2026-10-10T14:23:52.216Z",
  updatedAt: "2026-10-10T14:23:52.216Z",
} as const satisfies Module
