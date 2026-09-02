import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EffectSeconds = number

export const effectSeconds = {
  id: "01a05fb0-3ceb-717f-94f6-5ef52cdf0c41",
  pageTypeSlug: "number-property",
  slug: "effect-seconds",
  propertySlug: "seconds",
  definition: "how long an effect lasts",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An effect stating no seconds lasts as long as what carries the effect.",
    },
  ],
} as const satisfies NumberProperty
