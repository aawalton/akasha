import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData112 = {
  id: "01a061a3-982c-7dbd-b907-8e61251e9b1e",
  pageTypeSlug: "module",
  slug: "sets-data-112",
  definition: "part 112 of the gear set table, valkyn-skoria through vandorallens-resonance",
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
