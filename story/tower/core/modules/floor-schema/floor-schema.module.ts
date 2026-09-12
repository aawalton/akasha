import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const floorSchema = {
  id: "01a05bc6-fa4a-7002-abb7-afbb286ff064",
  type: "module",
  slug: "floor-schema",
  definition: "the shape a tower floor, its rooms and its encounters are stored in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A combatant on a floor is an enemy and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A floor enemy's equipment is known only by the numbers the equipment adds.",
    },
    {
      invariantKind: "departure",
      statement: "A floor with neither rooms nor encounters is still a floor.",
    },
  ],
} as const satisfies Module
