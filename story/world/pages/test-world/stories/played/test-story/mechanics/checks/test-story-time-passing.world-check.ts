import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const testStoryTimePassing = {
  id: "01a17eeb-58ce-70c9-8378-278e625a0e58",
  type: "page-type/world-check",
  slug: "test-story-time-passing",
  title: "Time Passing",
  world: "world/test-world",
  definition: "when a turn of the test story ends, and the day and light it ends in",
  description: "How far the day has gone in the test world.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ends at the end of the turn before plus the minutes its beats take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "October 27, 2026 is day one, and the story opens at eight in the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs six to half past six, and dusk six to half past six in the evening.",
    },
  ],
  createdAt: "2026-10-27T19:51:55.341Z",
  updatedAt: "2026-10-27T19:51:55.341Z",
} as const satisfies WorldCheck
