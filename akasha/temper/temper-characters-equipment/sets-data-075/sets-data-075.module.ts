import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData075 = {
  id: "01a061a3-6215-7372-b428-213413f4b97d",
  pageTypeSlug: "module",
  slug: "sets-data-075",
  definition: "part 075 of the gear set table, perfected-void-bash through perfected-yandirs-might",
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
