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
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
