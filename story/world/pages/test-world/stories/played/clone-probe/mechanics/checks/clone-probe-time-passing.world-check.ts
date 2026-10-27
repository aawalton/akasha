import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const cloneProbeTimePassing = {
  id: "01a17f3e-4458-763b-bdfb-1198fcd7d248",
  type: "page-type/world-check",
  slug: "clone-probe-time-passing",
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
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies WorldCheck
