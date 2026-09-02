import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companions = {
  id: "01a06119-5caf-7f14-b426-f5ed8d06b488",
  pageTypeSlug: "module",
  slug: "companions",
  definition: "every companion a player may take along, with the passive each one grants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A companion's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A companion moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
