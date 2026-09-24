import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const essenceAbsorption = {
  id: "01a0c506-b2d7-7a71-adff-ca0e9c867ef6",
  type: "page-type/game-mechanic",
  slug: "essence-absorption",
  definition: "how cleanly an essence seed is absorbed, and what that absorption costs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorption is intellect and will held against fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorption always takes, so no roll refuses one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The margin says how clean an absorption is rather than whether it happened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A margin of eight or more is clean, nought to seven adequate, and under nought rough.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clean absorption costs nine focus and carries no backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An adequate absorption costs eighteen focus and two fifths of the backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rough absorption costs thirty focus and the element's backlash whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rough absorption leaves the element's lingering mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorber holding neither a relevant skill nor any affinity is trained none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorber holding a relevant skill or any affinity at all is trained three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An absorber holding the element is trained six, and one more per tier above the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Absorbing an element the absorber does not hold opens that element at its first tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is consumed by any absorption, and what was drawn out leaves it inert.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies GameMechanic
