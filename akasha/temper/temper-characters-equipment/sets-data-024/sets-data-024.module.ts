import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData024 = {
  id: "01a061a3-012e-7b7d-8d7a-52fbfa3eacc8",
  pageTypeSlug: "module",
  slug: "sets-data-024",
  definition: "part 024 of the gear set table, defending-warrior through destructive-mage",
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
