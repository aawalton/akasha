import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book1LifestealBook1 = {
  id: "019db533-f390-758f-8815-5732fe20604f",
  type: "page-type/book",
  slug: "book-1-lifesteal-book-1",
  title: "1% Lifesteal",
  status: "not-started",
  author: "Edward Cuthbert Butler",
  unit: "unit/words",
  position: 1,
  ownLength: 151000,
  publishedAt: "2025-03-18",
  partOfCollections: ["book-series/book-series-1-lifesteal"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGWCDJSZ",
      externalLink: "https://amazon.com/dp/B0DGWCDJSZ",
    },
  ],
} as const satisfies Book
