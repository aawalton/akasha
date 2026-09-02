import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData056 = {
  id: "01a061a3-3081-7539-972f-a223e43fcab2",
  pageTypeSlug: "module",
  slug: "sets-data-056",
  definition: "part 056 of the gear set table, mantle-of-siroria through markyn-ring-of-majesty",
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
