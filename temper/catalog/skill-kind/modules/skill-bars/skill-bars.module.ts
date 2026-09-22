import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillBars = {
  id: "01a060db-b2bc-7125-b53b-c0f90c47961f",
  type: "page-type/module",
  slug: "skill-bars",
  definition: "the primary skill bar and the backup skill bar a character swaps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
