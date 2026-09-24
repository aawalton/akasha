import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const creatureIntent = {
  id: "01a0d3e8-280b-72a9-a759-0650ca05bd2a",
  type: "page-type/game-mechanic",
  slug: "creature-intent",
  definition: "how well a creature no player plays aims the strike it makes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A creature aims between a quarter and a half of its intellect, as one die of ten says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent the scene sets for a creature's strike is used in place of this one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No creature's page holds the intent it strikes with.",
    },
  ],
} as const satisfies GameMechanic
