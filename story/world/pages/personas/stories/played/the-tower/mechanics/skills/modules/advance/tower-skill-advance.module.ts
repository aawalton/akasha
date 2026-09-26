import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerSkillAdvance = {
  id: "01a0de1b-f868-7394-923a-160393bb2e7f",
  type: "page-type/module",
  slug: "tower-skill-advance",
  definition: "what a use of a skill in the Tower does to the level and rank that skill holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ranks a skill climbs are the rank pages handed in rather than a list held here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill advances only on a turn where that skill was meaningfully used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use below the rank a skill holds advances nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use at or above the rank rolls the level halfway to the rank's width, rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use at or above the next rank is one demonstration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Promotion takes as many demonstrations as the rank being entered is places above the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Until those are earned, the level holds one short of the rank's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On promotion the rank rises, the level opens at one, and demonstrations start again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One use never carries a skill through a promotion, so a promotion is a step of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill already placed at a rank is never demoted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill at the top rank rises one level a use, there being no rank above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance answers the levels climbed, so a promotion's reset is never a loss.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank no rank page names is refused rather than treated as the first.",
    },
  ],
} as const satisfies Module
