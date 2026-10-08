import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const anOutcastInAnotherWorldBook1 = {
  id: "019db533-f390-7751-93b5-72351f79757c",
  type: "page-type/book",
  slug: "an-outcast-in-another-world-book-1",
  title: "An Outcast In Another World",
  status: "completed",
  author: "KamikazePotato ",
  unit: "unit/words",
  position: 1,
  ownLength: 112250,
  ownProgress: 112250,
  publishedAt: "2021-09-16",
  partOfCollections: ["book-series/an-outcast-in-another-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09FZ16ZNT",
      externalLink: "https://amazon.com/dp/B09FZ16ZNT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
