import type { Book } from "../../book.page-type.ts"

export const discworldSnuff = {
  id: "019db533-f388-7e19-b9a3-1a604376448f",
  pageTypeSlug: "book",
  slug: "discworld-snuff",
  title: "Discworld: Snuff",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 39,
  ownLength: 103750,
  publishedAt: "2011-10-11",
  source: "kindle",
  externalId: "B005FFW46S",
  externalLink: "https://www.amazon.com/gp/product/B005FFW46S",
} as const satisfies Book
