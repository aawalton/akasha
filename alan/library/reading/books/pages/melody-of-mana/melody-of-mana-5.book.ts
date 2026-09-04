import type { Book } from "../../book.page-type.ts"

export const melodyOfMana5 = {
  id: "019db533-f391-7277-bdaf-47c116aaf5a7",
  pageTypeSlug: "book",
  slug: "melody-of-mana-5",
  title: "Melody of Mana 5",
  kind: "read",
  status: "completed",
  author: "Wandering Agent",
  unitSlug: "words",
  position: 5,
  ownLength: 52250,
  ownProgress: 52250,
  publishedAt: "2024-03-12",
  partOfSlugs: ["book-series/melody-of-mana"],
  source: "kindle",
  externalId: "B0CP4W7S7P",
  externalLink: "https://amazon.com/dp/B0CP4W7S7P",
} as const satisfies Book
