import type { Book } from "../../book.page-type.ts"

export const salvosBeast = {
  id: "019db533-f391-75ac-8cef-0522fa5dc7f8",
  pageTypeSlug: "book",
  slug: "salvos-beast",
  title: "Salvos: Beast",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 11,
  ownLength: 110750,
  publishedAt: "2023-11-01",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0C6FYQ95H",
  externalLink: "https://amazon.com/dp/B0C6FYQ95H",
} as const satisfies Book
