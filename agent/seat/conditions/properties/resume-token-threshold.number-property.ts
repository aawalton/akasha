import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resumeTokenThreshold = {
  id: "01a0687a-3d9d-7913-bd68-1b64d021e9be",
  type: "page-type/number-property",
  slug: "resume-token-threshold",
  propertySlug: "resume-token-threshold",
  definition:
    "the number of tokens a Claude Code session has before Claude Code shows a resume menu",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a headless seat has this threshold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A threshold no seat reaches is how the resume menu never appears.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T18:13:56.765Z",
  updatedAt: "2026-10-19T20:05:32.824Z",
} as const satisfies NumberProperty
