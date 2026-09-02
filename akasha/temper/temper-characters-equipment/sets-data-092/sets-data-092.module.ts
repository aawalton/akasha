import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData092 = {
  id: "01a061a3-621a-704d-b477-9b3c0f707d17",
  pageTypeSlug: "module",
  slug: "sets-data-092",
  definition: "part 092 of the gear set table, slimecraw through snake-in-the-stars",
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
