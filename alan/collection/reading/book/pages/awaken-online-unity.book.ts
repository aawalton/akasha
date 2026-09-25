import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineUnity = {
  id: "019db533-f390-7873-b33d-d2c5fabb5486",
  type: "page-type/book",
  slug: "awaken-online-unity",
  title: "Awaken Online: Unity",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 7,
  ownLength: 90250,
  ownProgress: 90250,
  publishedAt: "2019-06-18",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07SX5B2C5",
      externalLink: "https://amazon.com/dp/B07SX5B2C5",
    },
  ],
} as const satisfies Book
