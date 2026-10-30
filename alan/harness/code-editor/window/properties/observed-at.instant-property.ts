import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const observedAt = {
  id: "01a0a147-e5bb-7e9f-8e65-f498b08af58d",
  type: "page-type/instant-property",
  slug: "observed-at",
  propertySlug: "observed-at",
  definition: "the last time a code editor window writes a change to its features",
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
  createdAt: "2026-09-14T18:57:18.779Z",
  updatedAt: "2026-10-30T15:37:45.500Z",
} as const satisfies InstantProperty
