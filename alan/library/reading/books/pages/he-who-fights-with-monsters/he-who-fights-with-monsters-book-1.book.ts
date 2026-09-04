import type { Book } from "../../book.page-type.ts"

export const heWhoFightsWithMonstersBook1 = {
  id: "019db533-f391-70c4-a602-e0ca755a203a",
  pageTypeSlug: "book",
  slug: "he-who-fights-with-monsters-book-1",
  title: "He Who Fights with Monsters",
  status: "completed",
  author: "Shirtaloon",
  unitSlug: "words",
  position: 1,
  ownLength: 170000,
  ownProgress: 170000,
  publishedAt: "2021-03-09",
  partOfSlugs: ["book-series/he-who-fights-with-monsters"],
  source: "kindle",
  externalId: "B08WCT9W26",
  externalLink: "https://amazon.com/dp/B08WCT9W26",
} as const satisfies Book
