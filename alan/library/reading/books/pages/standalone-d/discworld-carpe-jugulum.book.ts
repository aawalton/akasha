import type { Book } from "../../book.page-type.ts"

export const discworldCarpeJugulum = {
  id: "019db533-f388-7de2-b941-4de56b2edab1",
  pageTypeSlug: "book",
  slug: "discworld-carpe-jugulum",
  title: "Discworld: Carpe Jugulum",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 22,
  ownLength: 96000,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W5MI9Y",
  externalLink: "https://www.amazon.com/gp/product/B000W5MI9Y",
} as const satisfies Book
