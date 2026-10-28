import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const heldStreamingOn = {
  id: "01a1847f-d8d9-7ed4-9900-1f700d5dd3ec",
  type: "page-type/computed-property",
  slug: "held-streaming-on",
  propertySlug: "held-streaming-on",
  definition: "every service Alan holds that what is left of a collection streams on",
  holds: "records",
  properties: [
    { pageProperty: "relation-property/streaming-service", required: true, many: false },
  ],
  code: "ts",
  test: "ts",
  sourceCredit: "Streaming data from JustWatch",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What is left streams on the services a collection's unfinished parts stream on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show or movie counts its own services while it is not completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is kept only where its own page says Alan holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each service is named once, in the order the addresses sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose rest is on no service Alan holds states no service.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T22:30:00.000Z",
  updatedAt: "2026-10-28T22:30:00.000Z",
} as const satisfies ComputedProperty
