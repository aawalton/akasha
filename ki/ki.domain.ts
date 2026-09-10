import type { Domain } from "../domains/domain.page-type.types.ts"

export const ki = {
  id: "01a06825-d0ec-77d4-b755-b534eea5b2d1",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "ki",
  definition: "what belongs to Ki herself",
  parts: [
    "page-type/ki-author",
    "page-type/ki-book",
    "page-type/ki-book-series",
    "page-type/ki-collection-template",
    "page-type/ki-episode",
    "page-type/ki-franchise",
    "page-type/ki-movie",
    "page-type/ki-season",
    "page-type/ki-show",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages Ki keeps here are reached by Ki alone among the people outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A page type here serves Ki as the matching page type of Alan's serves Alan.",
    },
  ],
} as const satisfies Domain
