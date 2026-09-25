import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallAsterFall = {
  id: "019db533-f391-7048-8d2b-8ef7c8e20361",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-aster-fall",
  title: "Guardian of Aster Fall: Aster Fall",
  status: "completed",
  author: "David North",
  unit: "unit/words",
  position: 2,
  ownLength: 133500,
  ownProgress: 133500,
  publishedAt: "2021-12-10",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09HJF498B",
      externalLink: "https://amazon.com/dp/B09HJF498B",
    },
  ],
} as const satisfies Book
