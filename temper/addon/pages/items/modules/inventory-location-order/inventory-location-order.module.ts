import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryLocationOrder = {
  id: "01a0e0a0-2424-7004-af9c-97bb9c20e4e9",
  type: "page-type/module",
  slug: "inventory-location-order",
  definition: "the order the addon shows the kinds of place an item is held in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The order is written from the location type pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of place is named by the key its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order is built the first time it is asked for, and held after.",
    },
  ],
} as const satisfies Module
