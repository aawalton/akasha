import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const outcomeCardsCheckTimePassing = {
  id: "01a17ffe-7d82-7c42-a85f-2c32a92ae54f",
  type: "page-type/world-check",
  slug: "outcome-cards-check-time-passing",
  title: "Time Passing",
  world: "world/outcome-cards-check-world",
  definition: "when a turn of the test story ends, and the day and light it ends in",
  description: "How far the day has gone in the test world.",
  settledBy: "world-check/test-story-time-passing",
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
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies WorldCheck
