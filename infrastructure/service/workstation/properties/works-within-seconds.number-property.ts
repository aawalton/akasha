import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const worksWithinSeconds = {
  id: "01a08caf-5c90-7f52-b4dc-e6e010e9aa46",
  type: "page-type/number-property",
  slug: "works-within-seconds",
  propertySlug: "works-within-seconds",
  definition: "how long a service may go without a round of its work landing",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating nothing here is judged by no round of work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating a window and having landed no round at all is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window holds room for a round to be missed rather than one round alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service states a window only where the service writes when a round of work landed.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
