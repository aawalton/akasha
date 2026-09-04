import type { Book } from "../../book.page-type.ts"

export const dungeonCrawlerCarlTheButchersMasquerade = {
  id: "019db533-f390-7edc-932f-9f8e8e7afa49",
  pageTypeSlug: "book",
  slug: "dungeon-crawler-carl-the-butchers-masquerade",
  title: "Dungeon Crawler Carl: The Butcher's Masquerade",
  status: "not-started",
  author: "Matt Dinniman",
  unitSlug: "words",
  position: 5,
  ownLength: 183000,
  publishedAt: "2022-02-28",
  partOfSlugs: ["book-series/dungeon-crawler-carl"],
  source: "kindle",
  externalId: "B09R6C5X88",
  externalLink: "https://amazon.com/dp/B09R6C5X88",
} as const satisfies Book
