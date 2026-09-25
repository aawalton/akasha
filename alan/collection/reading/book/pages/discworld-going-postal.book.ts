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
} as const satisfies Book
