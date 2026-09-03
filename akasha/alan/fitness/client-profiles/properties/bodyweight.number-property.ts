import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Bodyweight = number

export const bodyweight = {
  id: "01a06860-a0ef-76b6-bebf-a5ed8fc42f7b",
  pageTypeSlug: "number-property",
  slug: "bodyweight",
  propertySlug: "bodyweight",
  definition: "what the body being trained weighs, in pounds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The weight is read off the profile rather than handed in by a caller.",
    },
    {
      invariantKind: "departure",
      statement: "A movement's load factor is the share of this weight that movement carries.",
    },
  ],
} as const satisfies NumberProperty
