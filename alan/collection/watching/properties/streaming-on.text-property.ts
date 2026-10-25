import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const streamingOn = {
  id: "01a17481-a216-7c3e-a937-ab6a8dde5b35",
  type: "page-type/text-property",
  slug: "streaming-on",
  propertySlug: "streaming-on",
  definition: "a service a collection streams on in the United States",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is written as TMDB writes that service.",
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
      decisionKind: "decision-kind/departure",
      statement: "Every screen showing a service credits JustWatch, the source TMDB reads it from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No view of the Hallmark shelf shows a service.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A page's own screen shows its services without crediting JustWatch.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-25T19:20:15.125Z",
  updatedAt: "2026-10-25T20:30:29.025Z",
} as const satisfies TextProperty
