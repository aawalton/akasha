import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillSlots = {
  id: "01a060db-b2bc-7435-a916-f751d5505338",
  type: "page-type/module",
  slug: "skill-slots",
  definition: "the six places a skill sits in on a bar, five active and one ultimate",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill slot's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A skill slot moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["SKILL_SLOT_DATA"],
} as const satisfies Module
