import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentConfig = {
  id: "01a06100-3beb-75f4-a59d-ba8d15b49b38",
  pageTypeSlug: "module",
  slug: "equipment-config",
  definition:
    "the equipment settings the game addon reads, built from the rules and from the saved settings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting the rules do not decide falls back on the saved settings.",
    },
  ],
} as const satisfies Module
