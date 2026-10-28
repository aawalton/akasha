import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const partsStreamingOn = {
  id: "01a18415-d470-762a-90ae-cd4716e2efc4",
  type: "page-type/computed-property",
  slug: "parts-streaming-on",
  propertySlug: "parts-streaming-on",
  definition: "every service the collections a collection holds stream on, however far down",
  holds: "records",
  properties: [{ pageProperty: "text-property/streaming-service", required: true, many: false }],
  code: "ts",
  test: "ts",
  sourceCredit: "Streaming data from JustWatch",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection's parts stream on what each part streams on and what its parts do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each service is named once, however many parts stream on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The services are in alphabetical order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose parts stream on no service states no service.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:00:00.000Z",
  updatedAt: "2026-10-28T20:00:00.000Z",
} as const satisfies ComputedProperty
