import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const physAtk = {
  id: "01a0c473-6eee-71da-89a1-85de833a7921",
  type: "page-type/game-mechanic",
  slug: "phys-atk",
  definition: "physical attack power, from might, finesse and the weapon a fighter holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Might counts for half again as much as finesse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon's own attack is added whole.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is rounded here.",
    },
  ],
} as const satisfies GameMechanic
