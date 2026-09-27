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
      statement:
        "The skill slots are read from the skill slot pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill slot's place among the slots is its page's hash place.",
    },
  ],
} as const satisfies Module
