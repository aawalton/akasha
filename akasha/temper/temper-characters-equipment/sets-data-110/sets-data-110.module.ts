import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData110 = {
  id: "01a061a3-982c-7bc1-a0a2-72f7d6c01168",
  pageTypeSlug: "module",
  slug: "sets-data-110",
  definition: "part 110 of the gear set table, umbral-edge through undaunted-infiltrator",
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
