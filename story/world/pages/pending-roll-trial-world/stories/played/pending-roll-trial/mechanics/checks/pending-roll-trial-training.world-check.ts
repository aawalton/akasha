import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const pendingRollTrialTraining = {
  id: "01a183cf-b828-7aba-be99-92537cf05dc8",
  type: "page-type/world-check",
  slug: "pending-roll-trial-training",
  title: "Training",
  world: "world/pending-roll-trial-world",
  definition: "what one day's sword drill earns the test story's player character",
  description: "How much a day at the sword teaches.",
  settledBy: "world-check/test-story-training",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One day's drill rolls one twenty-sided die.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drill earns one swordplay experience, or two on fifteen or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A natural one hurts the drill's swordsman for three health and earns nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hurt takes from the health `<character>` of the reading's character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every ten swordplay experience is a rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drill adds to the skill `<character>-swordplay` of the reading's character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The code imports no page of its story, so a clone of the story forwards to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/pending-roll-trial-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies WorldCheck
