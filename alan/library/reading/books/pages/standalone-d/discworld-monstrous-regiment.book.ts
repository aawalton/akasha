import type { Book } from "../../book.page-type.ts"

export const discworldMonstrousRegiment = {
  id: "019db533-f388-7db9-b03e-57be736bae2c",
  pageTypeSlug: "book",
  slug: "discworld-monstrous-regiment",
  title: "Discworld: Monstrous Regiment",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 31,
  ownLength: 108000,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W938B2",
  externalLink: "https://www.amazon.com/gp/product/B000W938B2",
} as const satisfies Book
