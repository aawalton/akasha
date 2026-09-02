import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentQualities = {
  id: "01a060b8-08c6-7141-8b6e-044cf34927d5",
  pageTypeSlug: "module",
  slug: "equipment-qualities",
  definition: "the quality tiers a piece of equipment is made at, from no quality up to mythic",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A quality's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A quality moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
