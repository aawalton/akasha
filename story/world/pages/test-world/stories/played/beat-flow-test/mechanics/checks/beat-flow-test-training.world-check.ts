import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const beatFlowTestTraining = {
  id: "01a17f7f-6e81-7f07-be86-2d613c9930d0",
  type: "page-type/world-check",
  slug: "beat-flow-test-training",
  title: "Training",
  world: "world/test-world",
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
      statement: "A natural one hurts the drill's swordsman and earns nothing.",
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
        'The reading is `{"character":"character-player/beat-flow-test-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies WorldCheck
