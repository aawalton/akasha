import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldSnuff = {
  id: "019db533-f388-7e19-b9a3-1a604376448f",
  type: "page-type/book",
  slug: "discworld-snuff",
  title: "Discworld: Snuff",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 39,
  ownLength: 103750,
  publishedAt: "2011-10-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005FFW46S",
      externalLink: "https://www.amazon.com/gp/product/B005FFW46S",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
