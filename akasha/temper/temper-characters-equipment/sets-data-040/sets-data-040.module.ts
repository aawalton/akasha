import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData040 = {
  id: "01a061a3-0133-7753-9ca9-3703c72d04a8",
  pageTypeSlug: "module",
  slug: "sets-data-040",
  definition: "part 040 of the gear set table, hawks-eye through heartland-conqueror",
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
