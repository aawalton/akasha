import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData068 = {
  id: "01a061a3-3084-7041-afe6-abf5bd6d67b1",
  pageTypeSlug: "module",
  slug: "sets-data-068",
  definition:
    "part 068 of the gear set table, perfected-arms-of-relequen through perfected-cruel-flurry",
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
