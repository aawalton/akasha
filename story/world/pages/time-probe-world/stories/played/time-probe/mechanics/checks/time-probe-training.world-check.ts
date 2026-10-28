import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const timeProbeTraining = {
  id: "01a1802d-b13e-747a-ad25-93546e0478d1",
  type: "page-type/world-check",
  slug: "time-probe-training",
  title: "Training",
  world: "world/time-probe-world",
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
        'The reading is `{"character":"character-player/time-probe-player","experience":<held>}`.',
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldCheck
