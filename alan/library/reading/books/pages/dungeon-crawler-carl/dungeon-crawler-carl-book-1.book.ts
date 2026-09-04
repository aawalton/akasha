import type { Book } from "../../book.page-type.ts"

export const dungeonCrawlerCarlBook1 = {
  id: "019db533-f390-7f0a-9d60-f1950110ae5f",
  pageTypeSlug: "book",
  slug: "dungeon-crawler-carl-book-1",
  title: "Dungeon Crawler Carl",
  kind: "read",
  status: "not-started",
  author: "Matt Dinniman",
  unitSlug: "words",
  position: 1,
  ownLength: 111500,
  publishedAt: "2020-10-02",
  partOfSlugs: ["book-series/dungeon-crawler-carl"],
  source: "kindle",
  externalId: "B08BKGYQXW",
  externalLink: "https://amazon.com/dp/B08BKGYQXW",
} as const satisfies Book
