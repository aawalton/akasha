import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ResumeTokenThreshold = number

export const resumeTokenThreshold = {
  id: "01a0687a-3d9d-7913-bd68-1b64d021e9be",
  pageTypeSlug: "number-property",
  slug: "resume-token-threshold",
  propertySlug: "resume-token-threshold",
  definition: "how many tokens a seat's session holds before starting it offers the resume menu",
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
