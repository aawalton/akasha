import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData094 = {
  id: "01a061a3-621a-7f43-bdb5-3dee6c2303dd",
  pageTypeSlug: "module",
  slug: "sets-data-094",
  definition: "part 094 of the gear set table, spectres-eye through spelunker",
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
