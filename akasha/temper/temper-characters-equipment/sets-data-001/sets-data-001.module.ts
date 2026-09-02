import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData001 = {
  id: "01a0619d-2cab-7b93-87c5-42809f64fbbf",
  pageTypeSlug: "module",
  slug: "sets-data-001",
  definition: "part 001 of the gear set table, aegis-of-galenwe through aetherial-ascension",
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
