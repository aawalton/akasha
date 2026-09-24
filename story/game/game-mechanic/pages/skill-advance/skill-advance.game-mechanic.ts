import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const skillAdvance = {
  id: "01a0c50a-c305-7fb8-9a35-3c383695c0ef",
  type: "page-type/game-mechanic",
  slug: "skill-advance",
  definition: "what a use of a skill does to the level and rung that skill holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill advances only on a turn where that skill was meaningfully used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use below the rung a skill holds advances nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use at or above the rung rolls the level halfway to the rung's width, rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use at or above the next rung is one qualifying demonstration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Promotion takes as many demonstrations as the number of the rung being entered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Until those are earned, the level holds one short of the rung's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On promotion the rung rises, the level opens at one, and demonstrations start again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One use never carries a skill through a promotion, so a promotion is a step of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill already placed at a rung is never demoted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sage's level rises by one a use, there being no rung above to climb toward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance answers the levels climbed, so a promotion's reset is never a loss.",
    },
  ],
} as const satisfies GameMechanic
