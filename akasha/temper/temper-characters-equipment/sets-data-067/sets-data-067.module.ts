import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData067 = {
  id: "01a061a3-3084-7756-ac7e-bfd6b13fb155",
  pageTypeSlug: "module",
  slug: "sets-data-067",
  definition: "part 067 of the gear set table, pearlescent-ward through perfected-ansuuls-torment",
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
