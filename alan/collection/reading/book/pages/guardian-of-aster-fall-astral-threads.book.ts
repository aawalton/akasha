import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallAstralThreads = {
  id: "019db533-f390-7fc1-ae29-b8d039b2f719",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-astral-threads",
  title: "Guardian of Aster Fall: Astral Threads",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 132250,
  ownProgress: 132250,
  publishedAt: "2022-10-21",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4KQYS3K",
      externalLink: "https://amazon.com/dp/B0B4KQYS3K",
    },
  ],
} as const satisfies Book
