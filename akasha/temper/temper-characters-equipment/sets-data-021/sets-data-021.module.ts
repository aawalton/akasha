import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData021 = {
  id: "01a0619f-59ed-79b8-879b-dc0bfe2e6b08",
  pageTypeSlug: "module",
  slug: "sets-data-021",
  definition: "part 021 of the gear set table, curse-of-doylemish through darkstride",
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
