import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData043 = {
  id: "01a061a3-0134-7763-985e-65465f13cfbc",
  pageTypeSlug: "module",
  slug: "sets-data-043",
  definition: "part 043 of the gear set table, hist-bark through hollowfang-thirst",
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
