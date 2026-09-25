import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theViridianGateArchivesEmpiricalEndgame = {
  id: "019db533-f391-7c09-b241-fd3865d71072",
  type: "page-type/book",
  slug: "the-viridian-gate-archives-empirical-endgame",
  title: "The Viridian Gate Archives: Empirical Endgame",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 142250,
  publishedAt: "2022-01-04",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09KY95F7C",
      externalLink: "https://amazon.com/dp/B09KY95F7C",
    },
  ],
} as const satisfies Book
