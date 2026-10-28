import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const skillLockProbeUpkeep = {
  id: "01a17ff8-9a7f-7f51-b14f-fd0fc73f636d",
  type: "page-type/world-check",
  slug: "skill-lock-probe-upkeep",
  title: "Upkeep",
  world: "world/skill-lock-probe-world",
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
        'The reading is `{"character":"character-player/skill-lock-probe-player","coin":<held>}`.',
    },
  ],
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies WorldCheck
