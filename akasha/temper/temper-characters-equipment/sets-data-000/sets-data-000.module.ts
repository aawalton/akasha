import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData000 = {
  id: "01a0619d-2caa-7226-be72-6ecbc3be7403",
  pageTypeSlug: "module",
  slug: "sets-data-000",
  definition: "part 000 of the gear set table, no-set through aegis-caller",
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
