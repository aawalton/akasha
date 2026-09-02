import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData103 = {
  id: "01a061a3-982a-74a2-8ca9-ac0c3dacb3bf",
  pageTypeSlug: "module",
  slug: "sets-data-103",
  definition: "part 103 of the gear set table, the-juggernaut through thrassian-stranglers",
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
