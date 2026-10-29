import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const partsStreamingOn = {
  id: "01a18415-d470-762a-90ae-cd4716e2efc4",
  type: "page-type/computed-property",
  slug: "parts-streaming-on",
  propertySlug: "parts-streaming-on",
  definition: "every service the unfinished collections a collection holds stream on",
  holds: "records",
  properties: [
    { pageProperty: "relation-property/streaming-service", required: true, many: false },
  ],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection's parts stream on what each part streams on and what its parts do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A completed part's own services are left out, so the list says where the rest is.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A service is stated per show or movie, so a show's seasons are never told apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each service is named once, however many parts stream on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each service is the address of its streaming service page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The services are in the order their addresses sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is drawn by the title of its page rather than its address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose parts stream on no service states no service.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:00:00.000Z",
  updatedAt: "2026-10-29T14:12:28.309Z",
} as const satisfies ComputedProperty
