import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theViridianGateArchivesTheLichPriest = {
  id: "019db533-f38b-7096-bec1-ec0369aae6a9",
  type: "page-type/book",
  slug: "the-viridian-gate-archives-the-lich-priest",
  title: "The Viridian Gate Archives: The Lich Priest",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 67250,
  ownProgress: 67250,
  publishedAt: "2018-04-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07BTL7LKT",
      externalLink: "https://amazon.com/dp/B07BTL7LKT",
    },
  ],
} as const satisfies Book
