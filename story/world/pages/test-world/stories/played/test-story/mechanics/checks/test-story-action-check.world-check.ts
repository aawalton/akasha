import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const testStoryActionCheck = {
  id: "01a17ede-ad87-7ec9-8f62-82b148152d82",
  type: "page-type/world-check",
  slug: "test-story-action-check",
  title: "Action Check",
  world: "world/test-world",
  definition: "whether an act the player character tries in the test story comes off",
  description: "The test of whether something tried comes off, and how well.",
  settling: {},
  difficultyMoved: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus its named bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
  ],
  createdAt: "2026-10-27T19:38:05.062Z",
  updatedAt: "2026-10-27T19:38:05.062Z",
} as const satisfies WorldCheck
