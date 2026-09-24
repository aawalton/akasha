import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const skillBonus = {
  id: "01a0c509-6120-7815-a60f-0c3529b073c4",
  type: "page-type/game-mechanic",
  slug: "skill-bonus",
  definition: "the bonus a skill adds to an action, set by the rung that skill has reached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill adds by its rung, none at novice rising by one a rung to six at sage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The level a skill holds within its rung adds nothing, being shown rather than counted.",
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
  ],
} as const satisfies GameMechanic
