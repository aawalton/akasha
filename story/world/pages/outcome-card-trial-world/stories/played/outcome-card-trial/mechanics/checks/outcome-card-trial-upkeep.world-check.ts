import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const outcomeCardTrialUpkeep = {
  id: "01a183ae-dc71-7893-971a-7ef9b6b52755",
  type: "page-type/world-check",
  slug: "outcome-card-trial-upkeep",
  title: "Upkeep",
  world: "world/outcome-card-trial-world",
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
        'The reading is `{"character":"character-player/outcome-card-trial-player","coin":<held>}`.',
    },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies WorldCheck
