import type { NumberProperty } from "@akasha/pages/number-property"

export type Reps = number

export const reps = {
  id: "01a06580-66fd-7b7c-8cb6-d4b662eff55b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "reps",
  propertySlug: "reps",
  definition: "how many repetitions the set ran to",
  max: null,
} as const satisfies NumberProperty
