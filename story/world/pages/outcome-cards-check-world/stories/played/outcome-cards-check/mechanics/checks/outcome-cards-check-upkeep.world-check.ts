import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const outcomeCardsCheckUpkeep = {
  id: "01a17ffe-7d82-76b3-a74f-a7fb49cb2e74",
  type: "page-type/world-check",
  slug: "outcome-cards-check-upkeep",
  title: "Upkeep",
  world: "world/outcome-cards-check-world",
  definition: "what one day's board and lodging costs the test story's player character",
  description: "What a day's bed and meals cost.",
  settledBy: "world-check/test-story-upkeep",
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
        'The reading is `{"character":"character-player/outcome-cards-check-player","coin":<held>}`.',
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies WorldCheck
