import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData031 = {
  id: "01a061a3-0130-7e58-a3fe-b58323fe9e8e",
  pageTypeSlug: "module",
  slug: "sets-data-031",
  definition: "part 031 of the gear set table, eternal-warrior through eye-of-the-grasp",
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
