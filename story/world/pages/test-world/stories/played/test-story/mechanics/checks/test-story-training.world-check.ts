import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const testStoryTraining = {
  id: "01a17eeb-58ce-7db2-b591-31fafaef9d7c",
  type: "page-type/world-check",
  slug: "test-story-training",
  title: "Training",
  world: "world/test-world",
  definition: "what one day's sword drill earns the test story's player character",
  description: "How much a day at the sword teaches.",
  settling: {},
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
      statement:
        'The reading is `{"character":"character-player/test-story-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T19:51:55.341Z",
  updatedAt: "2026-10-27T19:51:55.341Z",
} as const satisfies WorldCheck
