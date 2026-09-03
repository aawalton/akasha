import type { Book } from "../../book.page-type.ts"

export const discworldRaisingSteam = {
  id: "019db533-f388-7e2e-ac65-ed3454bad032",
  pageTypeSlug: "book",
  slug: "discworld-raising-steam",
  title: "Discworld: Raising Steam",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 40,
  ownLength: 96500,
  publishedAt: "2014-03-18",
  source: "kindle",
  externalId: "B00FIN0TGY",
  externalLink: "https://www.amazon.com/gp/product/B00FIN0TGY",
} as const satisfies Book
