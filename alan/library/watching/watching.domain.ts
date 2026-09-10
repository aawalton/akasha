import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const watching = {
  id: "01a06599-ee09-7000-a394-4351ebf86462",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "watching",
  definition: "the shows and films Alan watches",
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
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A show sits under a franchise.",
    },
    {
      invariantKind: "departure",
      statement: "A season sits under a show.",
    },
    {
      invariantKind: "departure",
      statement: "An episode sits under a season.",
    },
    {
      invariantKind: "departure",
      statement: "A film sits under a franchise and under nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A length is stated only where the collection is watched in one sitting.",
    },
    {
      invariantKind: "departure",
      statement: "The provider's answers and Alan's records sit on the one page.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here records that Alan watched a show or a film this domain has.",
    },
  ],
} as const satisfies Domain
