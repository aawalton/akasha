import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData051 = {
  id: "01a061a3-307f-7fd5-a2b2-e63893e4e114",
  pageTypeSlug: "module",
  slug: "sets-data-051",
  definition: "part 051 of the gear set table, kynmarchers-cruelty through languor-of-peryite",
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
