import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldWintersmith = {
  id: "019db533-f388-7e8f-82ad-6e1df8ce8f74",
  type: "page-type/book",
  slug: "discworld-wintersmith",
  title: "Discworld: Wintersmith",
  status: "not-started",
  author: "Terry Pratchett, Paul Kidby",
  unit: "unit/words",
  position: 35,
  ownLength: 84000,
  publishedAt: "2009-10-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000JMKTE6",
      externalLink: "https://www.amazon.com/gp/product/B000JMKTE6",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
