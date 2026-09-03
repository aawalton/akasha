import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const bookOfEverything = {
  id: "01a0119c-fe6b-7001-994a-910d7505989a",
  pageTypeSlug: "domain",
  slug: "book-of-everything",
  definition: "the map of all knowledge",
  invariants: [
    {
      invariantKind: "departure",
      statement: "How far Alan has mastered each part of the map is kept with the part.",
    },
  ],
} as const satisfies Domain
