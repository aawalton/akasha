import type { Book } from "../../book.page-type.ts"

export const heWhoFightsWithMonsters3 = {
  id: "019db533-f391-70b5-bf08-88fc52bf9908",
  pageTypeSlug: "book",
  slug: "he-who-fights-with-monsters-3",
  title: "He Who Fights with Monsters 3",
  status: "completed",
  author: "Shirtaloon",
  unitSlug: "words",
  position: 3,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2021-09-07",
  partOfSlugs: ["book-series/he-who-fights-with-monsters"],
  source: "kindle",
  externalId: "B09443F69P",
  externalLink: "https://amazon.com/dp/B09443F69P",
} as const satisfies Book
