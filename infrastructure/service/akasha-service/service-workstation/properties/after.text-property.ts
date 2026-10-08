import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const after = {
  id: "01a06738-9f12-7d3a-bae3-9a7bbcd5ba19",
  type: "page-type/text-property",
  slug: "after",
  propertySlug: "after",
  definition: "a unit this unit starts after",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit named here orders the start without being required to be there.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T12:22:39.122Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
