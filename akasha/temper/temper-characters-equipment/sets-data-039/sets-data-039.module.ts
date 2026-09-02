import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData039 = {
  id: "01a061a3-0132-7bc7-a984-ad2509484a7e",
  pageTypeSlug: "module",
  slug: "sets-data-039",
  definition: "part 039 of the gear set table, hand-of-mephala through haven-of-ursus",
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
