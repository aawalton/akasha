import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const leveling = {
  id: "01a0c486-35ba-793b-b74b-bcb463138ca2",
  type: "page-type/game-mechanic",
  slug: "leveling",
  definition: "a level won for each floor cleared, with the attribute points it brings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A climber starts at the first level having cleared no floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One level is won for each floor cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three attribute points come with each level won.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No experience is counted, the floor cleared being the whole of what raises a level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level is the third way a climber grows, beside the skill rungs and the affinity tiers.",
    },
  ],
} as const satisfies GameMechanic
