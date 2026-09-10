import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const greenDay = {
  id: "01a0655b-4a9b-7008-9a0b-56117a559064",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "green-day",
  propertySlug: "green-day",
  definition: "the rung of the green day scale the craft reached on a day",
  max: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "A day that drew green states its rung rather than saying the day drew green.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
