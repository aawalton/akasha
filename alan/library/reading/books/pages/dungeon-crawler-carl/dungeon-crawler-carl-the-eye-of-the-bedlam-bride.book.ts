import type { Book } from "../../book.page-type.ts"

export const dungeonCrawlerCarlTheEyeOfTheBedlamBride = {
  id: "019db533-f390-7efe-b628-6780287ded3e",
  pageTypeSlug: "book",
  slug: "dungeon-crawler-carl-the-eye-of-the-bedlam-bride",
  title: "Dungeon Crawler Carl: The Eye of the Bedlam Bride",
  kind: "read",
  status: "not-started",
  author: "Matt Dinniman",
  unitSlug: "words",
  position: 6,
  ownLength: 173500,
  publishedAt: "2023-07-02",
  partOfSlugs: ["book-series/dungeon-crawler-carl"],
  source: "kindle",
  externalId: "B0C1R52V2J",
  externalLink: "https://amazon.com/dp/B0C1R52V2J",
} as const satisfies Book
