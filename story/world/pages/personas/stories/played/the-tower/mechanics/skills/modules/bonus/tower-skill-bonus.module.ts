import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerSkillBonus = {
  id: "01a0de1b-f868-79a3-a33c-0efb50370d6e",
  type: "page-type/module",
  slug: "tower-skill-bonus",
  definition: "the bonus a skill in the Tower adds to an action, set by the rank that skill holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill adds one for each rank below its own, none at the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The level a skill holds within its rank adds nothing, being shown rather than counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's bonus names the skill the bonus came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Even the largest add cannot rescue a strike the defender's gate has already settled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank no rank page names is refused rather than adding nothing.",
    },
  ],
} as const satisfies Module
