import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const floorSchema = {
  id: "01a05bc6-fa4a-7002-abb7-afbb286ff064",
  pageTypeSlug: "module",
  slug: "floor-schema",
  definition: "the shape a tower floor, its rooms and its encounters are stored in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A combatant standing on a floor is an enemy and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A floor enemy's equipment is known only by the numbers the equipment adds.",
    },
    {
      invariantKind: "departure",
      statement: "A floor holding neither rooms nor encounters is still a floor.",
    },
  ],
} as const satisfies Module
