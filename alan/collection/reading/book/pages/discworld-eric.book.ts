import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldEric = {
  id: "019db533-f38a-7eb0-99c2-2dba364db3f6",
  type: "page-type/book",
  slug: "discworld-eric",
  title: "Discworld: Eric",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 9,
  ownLength: 37250,
  publishedAt: "2012-12-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00GU32WNY",
      externalLink: "https://amazon.com/dp/B00GU32WNY",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
