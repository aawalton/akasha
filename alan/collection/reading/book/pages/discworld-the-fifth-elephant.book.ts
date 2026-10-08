import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheFifthElephant = {
  id: "019db533-f388-7e69-bf74-99838491500b",
  type: "page-type/book",
  slug: "discworld-the-fifth-elephant",
  title: "Discworld: The Fifth Elephant",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 24,
  ownLength: 104500,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W5MI9E",
      externalLink: "https://www.amazon.com/gp/product/B000W5MI9E",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
