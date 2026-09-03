import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseRedeemerOfTheDead = {
  id: "019db533-f391-7bfe-b901-3d0ac8fc594c",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-redeemer-of-the-dead",
  title: "The System Apocalypse: Redeemer of the Dead",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 2,
  ownLength: 80250,
  ownProgress: 80250,
  publishedAt: "2017-10-24",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B075NR9RCH",
  externalLink: "https://amazon.com/dp/B075NR9RCH",
} as const satisfies Book
