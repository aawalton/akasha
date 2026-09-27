import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryOpenRoomWait = {
  id: "01a0e36b-6780-7059-8c73-9310ce62bc0b",
  type: "page-type/module",
  slug: "inventory-open-room-wait",
  definition: "the containers an open run left for want of backpack room",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The free slots a wait needs are the buffer and the fewest slots one open takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line counts every container the run left for want of room.",
    },
  ],
} as const satisfies Module
