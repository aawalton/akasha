import type { Book } from "../../book.page-type.ts"

export const discworldWintersmith = {
  id: "019db533-f388-7e8f-82ad-6e1df8ce8f74",
  pageTypeSlug: "book",
  slug: "discworld-wintersmith",
  title: "Discworld: Wintersmith",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett, Paul Kidby",
  unitSlug: "words",
  position: 35,
  ownLength: 84000,
  publishedAt: "2009-10-06",
  source: "kindle",
  externalId: "B000JMKTE6",
  externalLink: "https://www.amazon.com/gp/product/B000JMKTE6",
} as const satisfies Book
