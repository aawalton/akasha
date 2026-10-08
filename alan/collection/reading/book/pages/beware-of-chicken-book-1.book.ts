import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bewareOfChickenBook1 = {
  id: "019db533-f390-7a17-ab53-f44c9612fcf1",
  type: "page-type/book",
  slug: "beware-of-chicken-book-1",
  title: "Beware of Chicken",
  status: "completed",
  author: "CasualFarmer",
  unit: "unit/words",
  position: 1,
  ownLength: 91750,
  ownProgress: 91750,
  publishedAt: "2022-05-24",
  partOfCollections: ["book-series/beware-of-chicken"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09Y6RQSHM",
      externalLink: "https://amazon.com/dp/B09Y6RQSHM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
