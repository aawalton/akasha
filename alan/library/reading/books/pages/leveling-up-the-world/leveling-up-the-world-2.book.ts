import type { Book } from "../../book.page-type.ts"

export const levelingUpTheWorld2 = {
  id: "019db533-f391-7169-aa06-0fd98eeb2d82",
  pageTypeSlug: "book",
  slug: "leveling-up-the-world-2",
  title: "Leveling Up The World 2",
  kind: "read",
  status: "completed",
  author: "Jonathan Swift",
  unitSlug: "words",
  position: 2,
  ownLength: 141000,
  ownProgress: 141000,
  publishedAt: "2023-03-29",
  partOfSlugs: ["book-series/leveling-up-the-world"],
  source: "kindle",
  externalId: "B0BTFY44MG",
  externalLink: "https://amazon.com/dp/B0BTFY44MG",
} as const satisfies Book
