import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData048 = {
  id: "01a061a3-307e-7014-8d63-65f25e79cb0d",
  pageTypeSlug: "module",
  slug: "sets-data-048",
  definition: "part 048 of the gear set table, jolting-arms through kargaeda",
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
