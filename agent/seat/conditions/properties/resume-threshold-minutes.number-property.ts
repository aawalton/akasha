import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resumeThresholdMinutes = {
  id: "01a0687a-3d9d-7635-aea8-41e35f78143b",
  type: "page-type/number-property",
  slug: "resume-threshold-minutes",
  propertySlug: "resume-threshold-minutes",
  definition: "the time a Claude Code session waits before Claude Code shows a resume menu",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a headless seat has this property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A threshold no seat reaches is how the resume menu never appears.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T18:13:56.765Z",
  updatedAt: "2026-10-19T20:05:50.458Z",
} as const satisfies NumberProperty
