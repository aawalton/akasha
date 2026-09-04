import type { Book } from "../../book.page-type.ts"

export const salvosRevelation = {
  id: "019db533-f391-758a-8e52-25be0769c51a",
  pageTypeSlug: "book",
  slug: "salvos-revelation",
  title: "Salvos: Revelation",
  status: "not-started",
  unitSlug: "words",
  position: 10,
  ownLength: 101000,
  publishedAt: "2023-05-27",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0BTLXNH9V",
  externalLink: "https://amazon.com/dp/B0BTLXNH9V",
} as const satisfies Book
