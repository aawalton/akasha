import type { Book } from "../../book.page-type.ts"

export const salvosTheTreasuresOfAlexander = {
  id: "019db533-f391-75da-81d4-8bfda3e80a1c",
  pageTypeSlug: "book",
  slug: "salvos-the-treasures-of-alexander",
  title: "Salvos: The Treasures of Alexander",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 8,
  ownLength: 102000,
  publishedAt: "2022-10-02",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0B8DDXHB8",
  externalLink: "https://amazon.com/dp/B0B8DDXHB8",
} as const satisfies Book
