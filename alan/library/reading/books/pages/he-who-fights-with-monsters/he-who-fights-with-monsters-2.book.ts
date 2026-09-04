import type { Book } from "../../book.page-type.ts"

export const heWhoFightsWithMonsters2 = {
  id: "019db533-f391-70a8-b0e4-59f5cc93d1b7",
  pageTypeSlug: "book",
  slug: "he-who-fights-with-monsters-2",
  title: "He Who Fights with Monsters 2",
  kind: "read",
  status: "completed",
  author: "Shirtaloon",
  unitSlug: "words",
  position: 2,
  ownLength: 141000,
  ownProgress: 141000,
  publishedAt: "2021-05-18",
  partOfSlugs: ["book-series/he-who-fights-with-monsters"],
  source: "kindle",
  externalId: "B08XVT2FKW",
  externalLink: "https://amazon.com/dp/B08XVT2FKW",
} as const satisfies Book
