import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldGoingPostal = {
  id: "019db533-f388-7d8b-8fad-187032b83bf1",
  type: "page-type/book",
  slug: "discworld-going-postal",
  title: "Discworld: Going Postal",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 33,
  ownLength: 112000,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W965QM",
      externalLink: "https://www.amazon.com/gp/product/B000W965QM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
