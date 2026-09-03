import type { Book } from "../../book.page-type.ts"

export const melodyOfManaBook1 = {
  id: "019db533-f391-72af-80c2-f321144612a3",
  pageTypeSlug: "book",
  slug: "melody-of-mana-book-1",
  title: "Melody of Mana",
  kind: "read",
  status: "completed",
  author: "Wandering Agent",
  unitSlug: "words",
  position: 1,
  ownLength: 87250,
  ownProgress: 87250,
  publishedAt: "2022-07-19",
  partOfSlugs: ["book-series/melody-of-mana"],
  source: "kindle",
  externalId: "B0B42YGVJW",
  externalLink: "https://amazon.com/dp/B0B42YGVJW",
} as const satisfies Book
