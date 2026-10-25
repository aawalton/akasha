import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const watching = {
  id: "01a06599-ee09-7000-a394-4351ebf86462",
  type: "page-type/domain",
  slug: "watching",
  definition: "the shows and movies Alan watches",
  parts: [
    "number-property/vote-average",
    "page-type/episode",
    "page-type/fandom",
    "page-type/fandom-collection",
    "page-type/franchise",
    "page-type/movie",
    "page-type/season",
    "page-type/show",
    "page-type/show-collection",
    "select-property/production-status",
    "text-property/genres",
    "text-property/imdb-id",
    "text-property/poster-path",
    "text-property/streaming-on",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A show sits under a franchise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season sits under a show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode sits under a season.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A length is stated only where the collection is watched in one sitting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The provider's answers and Alan's records sit on the one page.",
    },
  ],
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-10-25T19:20:15.125Z",
} as const satisfies Domain
