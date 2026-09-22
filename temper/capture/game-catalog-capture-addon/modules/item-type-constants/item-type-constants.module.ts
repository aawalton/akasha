import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemTypeConstants = {
  id: "01a06127-6646-7876-957d-a9127eb6ef26",
  type: "page-type/module",
  slug: "item-type-constants",
  definition: "the item type numbers the game client has, each under the client's own spelling",
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
