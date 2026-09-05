import type { NumberProperty } from "@akasha/pages-system/number-property"

export type JitterSeconds = number

export const jitterSeconds = {
  id: "01a05a3f-b42f-70bd-b842-502dd6568a36",
  pageTypeSlug: "number-property",
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
} as const satisfies NumberProperty
