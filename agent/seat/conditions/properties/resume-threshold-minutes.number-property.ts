import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resumeThresholdMinutes = {
  id: "01a0687a-3d9d-7635-aea8-41e35f78143b",
  type: "number-property",
  slug: "resume-threshold-minutes",
  propertySlug: "resume-threshold-minutes",
  definition: "how long a seat's session sits idle before starting it offers the resume menu",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a headless seat has this property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A threshold no seat reaches is how the resume menu never appears.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
