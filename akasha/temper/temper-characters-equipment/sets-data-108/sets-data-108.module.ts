import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData108 = {
  id: "01a061a3-982b-78cc-9148-90917f3279f8",
  pageTypeSlug: "module",
  slug: "sets-data-108",
  definition: "part 108 of the gear set table, turning-tide through twilight-remedy",
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
