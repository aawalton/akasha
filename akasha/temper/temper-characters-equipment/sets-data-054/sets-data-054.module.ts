import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData054 = {
  id: "01a061a3-3080-7cae-a336-4309d010b5e0",
  pageTypeSlug: "module",
  slug: "sets-data-054",
  definition: "part 054 of the gear set table, lucillas-windshield through mad-gods-dancing-shoes",
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
