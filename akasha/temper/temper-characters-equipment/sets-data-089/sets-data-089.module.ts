import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData089 = {
  id: "01a061a3-6219-7061-98c0-774afb48499a",
  pageTypeSlug: "module",
  slug: "sets-data-089",
  definition: "part 089 of the gear set table, shalk-exoskeleton through shattered-fate",
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
