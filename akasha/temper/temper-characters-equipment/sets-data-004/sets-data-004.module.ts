import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData004 = {
  id: "01a0619f-59e2-7a06-8a1a-8e9322b59c50",
  pageTypeSlug: "module",
  slug: "sets-data-004",
  definition: "part 004 of the gear set table, ansuuls-torment through arkasiss-genius",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
