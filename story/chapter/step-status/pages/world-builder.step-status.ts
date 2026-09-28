import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const worldBuilder = {
  id: "01a0dead-3b11-7d14-9f32-f1ada3adf863",
  type: "page-type/step-status",
  slug: "world-builder",
  title: "World Builder",
  definition: "the world builder's move, landing the lore a turn needs",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made at this status from the player's action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder advances the turn to game-master.",
    },
  ],
} as const satisfies StepStatus
