import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData080 = {
  id: "01a061a3-6216-7bcc-a03c-347d9a634903",
  pageTypeSlug: "module",
  slug: "sets-data-080",
  definition: "part 080 of the gear set table, rangers-gait through reawakened-hierophant",
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
