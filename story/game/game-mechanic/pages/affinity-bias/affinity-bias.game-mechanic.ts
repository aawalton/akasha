import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const affinityBias = {
  id: "01a0c4fc-db9f-78e8-bbf1-08b88eea6583",
  type: "page-type/game-mechanic",
  slug: "affinity-bias",
  definition: "the intent an affinity adds to an action its element matches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity adds intent equal to the tier that affinity has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity adds nothing to an action its element does not match.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No affinity carries a damage gate of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity sweetens a correct read rather than making one.",
    },
  ],
} as const satisfies GameMechanic
