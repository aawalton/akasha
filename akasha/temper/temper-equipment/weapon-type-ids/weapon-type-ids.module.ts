import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponTypeIds = {
  id: "01a060f0-3eae-7300-a19e-36158f3ca349",
  pageTypeSlug: "module",
  slug: "weapon-type-ids",
  definition: "every weapon type a character may hold, from the axe to the restoration staff",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This module names the weapon types without naming any order among the weapon types.",
    },
  ],
} as const satisfies Module
