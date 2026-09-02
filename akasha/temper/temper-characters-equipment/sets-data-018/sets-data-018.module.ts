import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData018 = {
  id: "01a0619f-59eb-774a-8868-2cdaa188edaf",
  pageTypeSlug: "module",
  slug: "sets-data-018",
  definition: "part 018 of the gear set table, coldharbours-favorite through corpseburster",
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
