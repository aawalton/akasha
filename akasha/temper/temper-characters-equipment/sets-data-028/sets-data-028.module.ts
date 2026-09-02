import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData028 = {
  id: "01a061a3-0130-7900-a376-f736c41ba316",
  pageTypeSlug: "module",
  slug: "sets-data-028",
  definition: "part 028 of the gear set table, druids-braid through earthgore",
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
