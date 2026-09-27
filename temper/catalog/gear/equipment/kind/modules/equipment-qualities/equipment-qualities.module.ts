import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentQualities = {
  id: "01a060b8-08c6-7141-8b6e-044cf34927d5",
  type: "page-type/module",
  slug: "equipment-qualities",
  definition: "the quality tiers a piece of equipment is made at, from no quality up to mythic",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quality's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The qualities are read from the quality pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One quality is lower than another when its hash place is lower.",
    },
  ],
} as const satisfies Module
