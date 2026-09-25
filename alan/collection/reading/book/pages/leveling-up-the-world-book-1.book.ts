import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorldBook1 = {
  id: "019db533-f391-7183-a898-b407a3da8039",
  type: "page-type/book",
  slug: "leveling-up-the-world-book-1",
  title: "Leveling Up The World",
  status: "completed",
  author: "Booker T. Washington",
  unit: "unit/words",
  position: 1,
  ownLength: 123000,
  ownProgress: 123000,
  publishedAt: "2023-02-28",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BHX9N31J",
      externalLink: "https://amazon.com/dp/B0BHX9N31J",
    },
  ],
} as const satisfies Book
