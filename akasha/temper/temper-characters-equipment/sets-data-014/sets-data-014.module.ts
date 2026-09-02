import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData014 = {
  id: "01a0619f-59e9-71fa-8fe6-6b453283f51f",
  pageTypeSlug: "module",
  slug: "sets-data-014",
  definition: "part 014 of the gear set table, bloodspawn through briarheart",
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
