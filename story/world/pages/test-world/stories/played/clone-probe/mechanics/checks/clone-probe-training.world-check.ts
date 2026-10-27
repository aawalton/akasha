import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const cloneProbeTraining = {
  id: "01a17f4c-d936-7d96-ba7e-f2a61645a5dc",
  type: "page-type/world-check",
  slug: "clone-probe-training",
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
      statement: "A drill adds to the skill `<character>-swordplay` of the reading's character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The code imports no page of its story, so a clone of the story forwards to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/clone-probe-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies WorldCheck
