import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData029 = {
  id: "01a061a3-0130-771e-bfb7-60e288eb600b",
  pageTypeSlug: "module",
  slug: "sets-data-029",
  definition: "part 029 of the gear set table, ebon-armory through endurance",
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
