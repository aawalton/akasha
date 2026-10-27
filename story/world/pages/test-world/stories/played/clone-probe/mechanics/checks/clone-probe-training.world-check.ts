import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const cloneProbeTraining = {
  id: "01a17f3e-4458-743e-bf45-5d0dd0503864",
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
      statement:
        'The reading is `{"character":"character-player/clone-probe-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies WorldCheck
