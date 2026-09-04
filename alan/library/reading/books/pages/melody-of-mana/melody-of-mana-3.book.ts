import type { Book } from "../../book.page-type.ts"

export const melodyOfMana3 = {
  id: "019db533-f391-72a3-b9ac-9e08c20c6cab",
  pageTypeSlug: "book",
  slug: "melody-of-mana-3",
  title: "Melody of Mana 3",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 59250,
  ownProgress: 59250,
  publishedAt: "2023-03-28",
  partOfSlugs: ["book-series/melody-of-mana"],
  source: "kindle",
  externalId: "B0BNK52WPW",
  externalLink: "https://amazon.com/dp/B0BNK52WPW",
} as const satisfies Book
