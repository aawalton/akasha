import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData116 = {
  id: "01a061a3-982d-7b80-a2d6-bbbc20cace71",
  pageTypeSlug: "module",
  slug: "sets-data-116",
  definition: "part 116 of the gear set table, vrols-command through ward-of-cyrodiil",
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
