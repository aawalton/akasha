import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData098 = {
  id: "01a061a3-9828-7415-abf3-c1402d47a113",
  pageTypeSlug: "module",
  slug: "sets-data-098",
  definition: "part 098 of the gear set table, stormweavers-cavort through sunderflame",
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
