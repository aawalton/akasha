import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const testStoryUpkeep = {
  id: "01a17eeb-58cf-776b-ba64-5cc96eee1074",
  type: "page-type/world-check",
  slug: "test-story-upkeep",
  title: "Upkeep",
  world: "world/test-world",
  definition: "what one day's board and lodging costs the test story's player character",
  description: "What a day's bed and meals cost.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's board and lodging costs three coin, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that cannot be paid for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day leaving less than the next day's board leaves the routine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/test-story-player","coin":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T19:51:55.341Z",
  updatedAt: "2026-10-27T19:51:55.341Z",
} as const satisfies WorldCheck
