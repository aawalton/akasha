import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const infiniteRealmTheAspects = {
  id: "019db533-f391-7a8a-a152-e7b0e351b1e9",
  type: "page-type/book",
  slug: "infinite-realm-the-aspects",
  title: "Infinite Realm: The Aspects",
  status: "not-started",
  author: "James P. Carse, James Carse",
  unit: "unit/words",
  position: 5,
  ownLength: 299000,
  publishedAt: "2023-03-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BXJLKRHH",
      externalLink: "https://amazon.com/dp/B0BXJLKRHH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
