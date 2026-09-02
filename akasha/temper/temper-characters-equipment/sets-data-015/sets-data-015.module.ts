import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData015 = {
  id: "01a0619f-59e9-74d5-9f5b-32a6a3411d5e",
  pageTypeSlug: "module",
  slug: "sets-data-015",
  definition: "part 015 of the gear set table, bright-throats-boast through call-of-the-undertaker",
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
