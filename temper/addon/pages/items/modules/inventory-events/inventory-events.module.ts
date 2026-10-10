import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryEvents = {
  id: "01a06258-b52b-7a61-a1ab-0439cd103604",
  type: "page-type/module",
  slug: "inventory-events",
  definition: "the game events the add-on listens to, and what each one refreshes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bank visit scans the bag that visit opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot the add-on changed at a bank is judged again as any other slot is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is used or opened while a bank visit still has moves in flight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A closing bank is what dispatches the uses a visit's withdrawals earned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A whole-inventory update settles the pending actions, as a sale at a store sends one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A closing bank or guild bank settles the pending actions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A backpack slot changing while containers wait for room opens them once room is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A listener this module hands out to another takes a namespace under this one rather than this one.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.851Z",
  updatedAt: "2026-10-10T14:08:31.826Z",
} as const satisfies Module
