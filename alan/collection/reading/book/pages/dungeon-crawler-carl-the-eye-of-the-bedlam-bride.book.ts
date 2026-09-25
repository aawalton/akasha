import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlTheEyeOfTheBedlamBride = {
  id: "019db533-f390-7efe-b628-6780287ded3e",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-the-eye-of-the-bedlam-bride",
  title: "Dungeon Crawler Carl: The Eye of the Bedlam Bride",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 6,
  ownLength: 173500,
  publishedAt: "2023-07-02",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C1R52V2J",
      externalLink: "https://amazon.com/dp/B0C1R52V2J",
    },
  ],
} as const satisfies Book
