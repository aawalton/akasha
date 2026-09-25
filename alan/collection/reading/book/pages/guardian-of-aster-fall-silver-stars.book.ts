import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallSilverStars = {
  id: "019db533-f390-7ffd-a73e-e2b4e674bc59",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-silver-stars",
  title: "Guardian of Aster Fall: Silver Stars",
  status: "completed",
  unit: "unit/words",
  position: 8,
  ownLength: 117500,
  ownProgress: 117500,
  publishedAt: "2024-09-12",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW69JXNC",
      externalLink: "https://amazon.com/dp/B0CW69JXNC",
    },
  ],
} as const satisfies Book
