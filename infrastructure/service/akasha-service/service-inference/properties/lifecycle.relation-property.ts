import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const lifecycle = {
  id: "01a09095-243b-7ce0-9a35-68fd9e450733",
  type: "page-type/relation-property",
  slug: "lifecycle",
  propertySlug: "lifecycle",
  definition: "how a service is held on its host",
  targetPageType: "page-type/service-lifecycle",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service the pool swaps in and out names the pool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that runs at all times names always-on.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T13:08:08.379Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies RelationProperty
