import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionSource = {
  id: "01a06076-1b6c-74d2-820b-7207017f2a40",
  type: "page-type/module",
  slug: "potion-source",
  definition: "every potion a character drinks, put into one table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A potion's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A potion moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["POTIONS"],
} as const satisfies Module
