import type { Book } from "../book.page-type.ts"

export const heWhoFightsWithMonsters8 = {
  id: "019db533-f391-7054-a2fe-e3b6d3d45233",
  pageTypeSlug: "book",
  type: "book",
  slug: "he-who-fights-with-monsters-8",
  title: "He Who Fights with Monsters 8",
  status: "completed",
  author: "Shirtaloon",
  unit: "words",
  position: 8,
  ownLength: 156000,
  ownProgress: 156000,
  publishedAt: "2022-12-13",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  source: "kindle",
  externalId: "B0BBWK3T9T",
  externalLink: "https://amazon.com/dp/B0BBWK3T9T",
} as const satisfies Book
