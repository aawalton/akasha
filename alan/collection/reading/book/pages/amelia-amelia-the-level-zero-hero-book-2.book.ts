import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ameliaAmeliaTheLevelZeroHeroBook2 = {
  id: "019db533-f390-7709-8b16-258d76a837ba",
  type: "page-type/book",
  slug: "amelia-amelia-the-level-zero-hero-book-2",
  title: "Amelia: Amelia The Level Zero Hero Book 2",
  status: "not-started",
  author: "V.A Lewis",
  unit: "unit/words",
  position: 2,
  ownLength: 147500,
  publishedAt: "2023-07-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C4CC51BJ",
      externalLink: "https://amazon.com/dp/B0C4CC51BJ",
    },
  ],
} as const satisfies Book
