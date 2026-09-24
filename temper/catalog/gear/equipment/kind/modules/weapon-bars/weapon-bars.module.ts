import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponBars = {
  id: "01a060b8-08c6-7381-8ac1-7788bdbe2c6c",
  type: "page-type/module",
  slug: "weapon-bars",
  definition: "the primary bar and the backup bar a character swaps between in combat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon bar's place in this table is the precedence an addon reads the bar in.",
    },
  ],
} as const satisfies Module
