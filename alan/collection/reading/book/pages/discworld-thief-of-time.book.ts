import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldThiefOfTime = {
  id: "019db533-f388-7d72-9232-7cf8cfeebbb2",
  type: "page-type/book",
  slug: "discworld-thief-of-time",
  title: "Discworld: Thief of Time",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 26,
  ownLength: 99750,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W916WK",
      externalLink: "https://www.amazon.com/gp/product/B000W916WK",
    },
  ],
} as const satisfies Book
