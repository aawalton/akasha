import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type WorksWithinSeconds = number

export const worksWithinSeconds = {
  id: "01a08caf-5c90-7f52-b4dc-e6e010e9aa46",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "works-within-seconds",
  propertySlug: "works-within-seconds",
  definition: "how long a service may go without a round of its work landing",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service stating nothing here is judged by no round of work.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating a window and having landed no round at all is broken.",
    },
    {
      invariantKind: "departure",
      statement: "A window holds room for a round to be missed rather than one round alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service states a window only where the service writes when a round of work landed.",
    },
  ],
} as const satisfies NumberProperty
