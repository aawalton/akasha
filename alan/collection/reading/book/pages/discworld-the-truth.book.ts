import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheTruth = {
  id: "019db533-f388-7e84-9149-9f287177dd6a",
  type: "page-type/book",
  slug: "discworld-the-truth",
  title: "Discworld: The Truth",
  status: "not-started",
  author: "Terry Pratchett, Stephen Briggs",
  unit: "unit/words",
  position: 25,
  ownLength: 104000,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W5MIEO",
      externalLink: "https://www.amazon.com/gp/product/B000W5MIEO",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
