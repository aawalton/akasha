import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const anOutcastInAnotherWorld3 = {
  id: "019db533-f390-7745-b704-78e02fe9213a",
  type: "page-type/book",
  slug: "an-outcast-in-another-world-3",
  title: "An Outcast In Another World 3",
  status: "completed",
  author: "KamikazePotato ",
  unit: "unit/words",
  position: 3,
  ownLength: 192250,
  ownProgress: 192250,
  publishedAt: "2022-06-09",
  partOfCollections: ["book-series/an-outcast-in-another-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B2433VTD",
      externalLink: "https://amazon.com/dp/B0B2433VTD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
