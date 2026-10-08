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
  createdAt: "2026-09-26T17:04:49.937Z",
  updatedAt: "2026-09-28T18:50:04.000Z",
} as const satisfies StepStatus
