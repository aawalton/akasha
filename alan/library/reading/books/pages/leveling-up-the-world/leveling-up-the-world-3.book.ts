import type { Book } from "../../book.page-type.ts"

export const levelingUpTheWorld3 = {
  id: "019db533-f391-7175-b75c-1912e7d3d47a",
  pageTypeSlug: "book",
  slug: "leveling-up-the-world-3",
  title: "Leveling Up The World 3",
  status: "completed",
  author: "Jonathan Swift",
  unitSlug: "words",
  position: 3,
  ownLength: 150000,
  ownProgress: 150000,
  publishedAt: "2023-05-31",
  partOfSlugs: ["book-series/leveling-up-the-world"],
  source: "kindle",
  externalId: "B0BTH56JSG",
  externalLink: "https://amazon.com/dp/B0BTH56JSG",
} as const satisfies Book
