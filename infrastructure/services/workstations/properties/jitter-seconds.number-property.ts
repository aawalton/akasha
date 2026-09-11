import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const jitterSeconds = {
  id: "01a05a3f-b42f-70bd-b842-502dd6568a36",
  type: "number-property",
  slug: "jitter-seconds",
  propertySlug: "jitter-seconds",
  definition: "how far past its time a timer may start",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each timer stating this property starts at its own moment.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
