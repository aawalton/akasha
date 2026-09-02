import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData036 = {
  id: "01a061a3-0132-7077-8a16-3b4a0b17dd6c",
  pageTypeSlug: "module",
  slug: "sets-data-036",
  definition: "part 036 of the gear set table, giant-spider through grand-rejuvenation",
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
