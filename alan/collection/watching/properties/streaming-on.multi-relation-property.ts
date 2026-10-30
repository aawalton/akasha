import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const streamingOn = {
  id: "01a17481-a216-7c3e-a937-ab6a8dde5b35",
  type: "page-type/multi-relation-property",
  slug: "streaming-on",
  propertySlug: "streaming-on",
  definition: "a streaming service that has a collection in Alan's country",
  targetPageType: "page-type/streaming-service",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is the streaming service page the name TMDB writes reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is one a subscription or free viewing with ads reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A service a collection is only rented or bought on is not stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection on no service states no service rather than the services it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day TMDB was last asked is the day its identity was last synced.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No screen showing a service names where the service data came from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No view of the Hallmark shelf shows a service.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-25T19:20:15.125Z",
  updatedAt: "2026-10-30T15:19:26.754Z",
} as const satisfies MultiRelationProperty
