import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData081 = {
  id: "01a061a3-6216-77eb-bdad-9a9303b2a9bb",
  pageTypeSlug: "module",
  slug: "sets-data-081",
  definition:
    "part 081 of the gear set table, recovery-convergence through relics-of-the-rebellion",
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
