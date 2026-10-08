import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsSwarm = {
  id: "019db533-f390-7a8c-a327-dc74a4542109",
  type: "page-type/book",
  slug: "chaos-seeds-swarm",
  title: "Chaos Seeds: Swarm",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 5,
  ownLength: 200250,
  ownProgress: 200250,
  publishedAt: "2016-10-12",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01LQOXYHY",
      externalLink: "https://amazon.com/dp/B01LQOXYHY",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
