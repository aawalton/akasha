import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldJingo = {
  id: "019db533-f388-7e02-a3ec-b142705dafa9",
  type: "page-type/book",
  slug: "discworld-jingo",
  title: "Discworld: Jingo",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 21,
  ownLength: 103500,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W5MIH6",
      externalLink: "https://www.amazon.com/gp/product/B000W5MIH6",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
