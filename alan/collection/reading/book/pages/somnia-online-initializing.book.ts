import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineInitializing = {
  id: "019db533-f391-7661-83da-5620d170f2f8",
  type: "page-type/book",
  slug: "somnia-online-initializing",
  title: "Somnia Online: Initializing",
  status: "completed",
  author: "K T Hanna",
  unit: "unit/words",
  position: 1,
  ownLength: 108000,
  ownProgress: 108000,
  publishedAt: "2018-05-14",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07CV1DZ3P",
      externalLink: "https://amazon.com/dp/B07CV1DZ3P",
    },
  ],
} as const satisfies Book
