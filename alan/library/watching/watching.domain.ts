import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const watching = {
  id: "01a06599-ee09-7000-a394-4351ebf86462",
  pageTypeSlug: "domain",
  slug: "watching",
  definition: "the shows and films Alan watches",
  partSlugs: [
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
      statement: "What the provider answers with and what Alan records stand on the one page.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here records that Alan watched any of it.",
    },
  ],
} as const satisfies Domain
