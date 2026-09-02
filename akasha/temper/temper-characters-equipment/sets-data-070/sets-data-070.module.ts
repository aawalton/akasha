import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData070 = {
  id: "01a061a3-3085-7f02-b7c9-464754da2d00",
  pageTypeSlug: "module",
  slug: "sets-data-070",
  definition:
    "part 070 of the gear set table, perfected-gallant-charge through perfected-lucent-echoes",
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
