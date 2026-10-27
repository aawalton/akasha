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
      statement: "An act is settled by the tiered roll, with `--dice 3d60`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill adds its experience, at most 50, under the skill's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat named in place of a skill adds three for each point over ten.",
    },
  ],
  createdAt: "2026-10-27T19:38:05.062Z",
  updatedAt: "2026-10-27T20:00:25.770Z",
} as const satisfies WorldCheck
