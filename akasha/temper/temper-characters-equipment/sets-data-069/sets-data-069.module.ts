import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData069 = {
  id: "01a061a3-3084-79b5-a836-426e6739c2fa",
  pageTypeSlug: "module",
  slug: "sets-data-069",
  definition:
    "part 069 of the gear set table, perfected-crushing-wall through perfected-frenzied-momentum",
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
