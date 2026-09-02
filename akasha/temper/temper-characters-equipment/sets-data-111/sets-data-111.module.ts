import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData111 = {
  id: "01a061a3-982c-7db9-9f95-3f611e443ee7",
  pageTypeSlug: "module",
  slug: "sets-data-111",
  definition: "part 111 of the gear set table, undaunted-unweaver through unleashed-terror",
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
