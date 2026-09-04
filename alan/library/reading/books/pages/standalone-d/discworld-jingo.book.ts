import type { Book } from "../../book.page-type.ts"

export const discworldJingo = {
  id: "019db533-f388-7e02-a3ec-b142705dafa9",
  pageTypeSlug: "book",
  slug: "discworld-jingo",
  title: "Discworld: Jingo",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 21,
  ownLength: 103500,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W5MIH6",
  externalLink: "https://www.amazon.com/gp/product/B000W5MIH6",
} as const satisfies Book
