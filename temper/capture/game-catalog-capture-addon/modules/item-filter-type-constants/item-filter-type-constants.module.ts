import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemFilterTypeConstants = {
  id: "01a06127-6642-7422-baf1-357f6f2e6d5f",
  type: "page-type/module",
  slug: "item-filter-type-constants",
  definition:
    "the inventory filter numbers the game client has, each under the client's own spelling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a number into display text.",
    },
  ],
} as const satisfies Module
