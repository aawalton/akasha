import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData072 = {
  id: "01a061a3-6213-7409-b2e8-6344b6487d1a",
  pageTypeSlug: "module",
  slug: "sets-data-072",
  definition:
    "part 072 of the gear set table, perfected-pillagers-profit through perfected-roaring-opportunist",
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
