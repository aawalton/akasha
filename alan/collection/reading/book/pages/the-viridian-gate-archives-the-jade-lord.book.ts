import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theViridianGateArchivesTheJadeLord = {
  id: "019db533-f38b-70e7-a6be-5612260a30aa",
  type: "page-type/book",
  slug: "the-viridian-gate-archives-the-jade-lord",
  title: "The Viridian Gate Archives: The Jade Lord",
  status: "completed",
  author: "James A. Hunter",
  unit: "unit/words",
  position: 3,
  ownLength: 90250,
  ownProgress: 90250,
  publishedAt: "2017-06-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B071JV49FB",
      externalLink: "https://amazon.com/dp/B071JV49FB",
    },
  ],
} as const satisfies Book
