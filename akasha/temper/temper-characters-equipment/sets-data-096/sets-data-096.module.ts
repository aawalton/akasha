import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData096 = {
  id: "01a061a3-621a-7e75-a05c-58115377cd87",
  pageTypeSlug: "module",
  slug: "sets-data-096",
  definition: "part 096 of the gear set table, steadfasts-mettle through stonehulk-domination",
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
