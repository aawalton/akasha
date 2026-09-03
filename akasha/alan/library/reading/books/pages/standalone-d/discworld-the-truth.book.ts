import type { Book } from "../../book.page-type.ts"

export const discworldTheTruth = {
  id: "019db533-f388-7e84-9149-9f287177dd6a",
  pageTypeSlug: "book",
  slug: "discworld-the-truth",
  title: "Discworld: The Truth",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett, Stephen Briggs",
  unitSlug: "words",
  position: 25,
  ownLength: 104000,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W5MIEO",
  externalLink: "https://www.amazon.com/gp/product/B000W5MIEO",
} as const satisfies Book
