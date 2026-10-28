import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const timeProbeTimePassing = {
  id: "01a1802d-b13e-7420-823e-ff2add3cc02f",
  type: "page-type/world-check",
  slug: "time-probe-time-passing",
  title: "Time Passing",
  world: "world/time-probe-world",
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
      statement: "October 27, 2026 is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A first turn starts at its story's opensAt, so no opening time is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs six to half past six, and dusk six to half past six in the evening.",
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldCheck
