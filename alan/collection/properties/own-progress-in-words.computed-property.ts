import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const ownProgressInWords = {
  id: "01a07231-dd65-7d2c-b7d0-3952fdd790d3",
  type: "page-type/computed-property",
  slug: "own-progress-in-words",
  propertySlug: "own-progress-in-words",
  definition: "the progress through a collection without its parts counted in words",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection completed states its whole length as its own progress.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T15:31:05.701Z",
  updatedAt: "2026-10-30T15:09:51.195Z",
} as const satisfies ComputedProperty
