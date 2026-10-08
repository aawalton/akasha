import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resumeTokenThreshold = {
  id: "01a0687a-3d9d-7913-bd68-1b64d021e9be",
  type: "page-type/number-property",
  slug: "resume-token-threshold",
  propertySlug: "resume-token-threshold",
  definition: "how many tokens a seat's session has before starting it offers the resume menu",
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
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
