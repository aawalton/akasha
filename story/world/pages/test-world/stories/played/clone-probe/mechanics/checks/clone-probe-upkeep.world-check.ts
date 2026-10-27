import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const cloneProbeUpkeep = {
  id: "01a17f4c-d936-74a4-b50a-80a29da305d3",
  type: "page-type/world-check",
  slug: "clone-probe-upkeep",
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
      statement: "A day is paid from the purse sharing the slug of the reading's character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The code imports no page of its story, so a clone of the story forwards to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/clone-probe-player","coin":<held>}`.',
    },
  ],
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies WorldCheck
