import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlBook1 = {
  id: "019db533-f390-7f0a-9d60-f1950110ae5f",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-book-1",
  title: "Dungeon Crawler Carl",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 1,
  ownLength: 111500,
  publishedAt: "2020-10-02",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BKGYQXW",
      externalLink: "https://amazon.com/dp/B08BKGYQXW",
    },
  ],
} as const satisfies Book
