import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionsCrafted = {
  id: "01a06076-1b6a-7cba-9441-c81e409dbcd4",
  type: "page-type/module",
  slug: "potions-crafted",
  definition: "every crafted essence, put into one table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A crafted potion's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A crafted potion moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
