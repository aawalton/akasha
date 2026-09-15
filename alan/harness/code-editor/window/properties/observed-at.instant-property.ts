import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const observedAt = {
  id: "01a0a147-e5bb-7e9f-8e65-f498b08af58d",
  type: "page-type/instant-property",
  slug: "observed-at",
  propertySlug: "observed-at",
  definition: "when what a window holds of its features was last observed",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The time is the one the observer read off its own clock as it wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that lands nothing new leaves this time where that time was.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
