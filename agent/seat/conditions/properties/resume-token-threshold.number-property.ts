import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resumeTokenThreshold = {
  id: "01a0687a-3d9d-7913-bd68-1b64d021e9be",
  type: "number-property",
  slug: "resume-token-threshold",
  propertySlug: "resume-token-threshold",
  definition: "how many tokens a seat's session has before starting it offers the resume menu",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a headless seat has this threshold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A threshold no seat reaches is how the resume menu never appears.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
