import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ResumeThresholdMinutes = number

export const resumeThresholdMinutes = {
  id: "01a0687a-3d9d-7635-aea8-41e35f78143b",
  pageTypeSlug: "number-property",
  slug: "resume-threshold-minutes",
  propertySlug: "resume-threshold-minutes",
  definition: "how long a seat's session sits idle before starting it offers the resume menu",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a headless seat carries this.",
    },
    {
      invariantKind: "departure",
      statement: "A threshold no seat reaches is how the resume menu never appears.",
    },
  ],
} as const satisfies NumberProperty
