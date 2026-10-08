import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const roadToMasteryBook1 = {
  id: "019db533-f391-753b-9683-4df239dd755d",
  type: "page-type/book",
  slug: "road-to-mastery-book-1",
  title: "Road to Mastery",
  status: "completed",
  author: "Tony Annesi",
  unit: "unit/words",
  position: 1,
  ownLength: 184000,
  ownProgress: 184000,
  publishedAt: "2023-05-30",
  partOfCollections: ["book-series/road-to-mastery"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BW9X6H59",
      externalLink: "https://amazon.com/dp/B0BW9X6H59",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
