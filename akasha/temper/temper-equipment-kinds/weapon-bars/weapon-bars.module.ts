import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponBars = {
  id: "01a060b8-08c6-7381-8ac1-7788bdbe2c6c",
  pageTypeSlug: "module",
  slug: "weapon-bars",
  definition: "the primary bar and the backup bar a character swaps between in combat",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A weapon bar's place in this table is the precedence an addon reads the bar in.",
    },
    {
      invariantKind: "gap",
      statement: "A weapon bar moved to another place changes which bar an addon prefers.",
    },
  ],
} as const satisfies Module
