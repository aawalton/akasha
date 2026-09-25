import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ameliaAmeliaTheLevelZeroHeroBook1 = {
  id: "019db533-f390-76fe-bdb3-e4b6a6926f2a",
  type: "page-type/book",
  slug: "amelia-amelia-the-level-zero-hero-book-1",
  title: "Amelia: Amelia The Level Zero Hero Book 1",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 151250,
  publishedAt: "2023-05-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BZDW9NVH",
      externalLink: "https://amazon.com/dp/B0BZDW9NVH",
    },
  ],
} as const satisfies Book
