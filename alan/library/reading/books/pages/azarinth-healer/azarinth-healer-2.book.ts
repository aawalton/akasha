import type { Book } from "../../book.page-type.ts"

export const azarinthHealer2 = {
  id: "019db533-f390-78e1-9793-ab289d1432e4",
  pageTypeSlug: "book",
  slug: "azarinth-healer-2",
  title: "Azarinth Healer 2",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 142000,
  ownProgress: 142000,
  publishedAt: "2023-04-20",
  partOfSlugs: ["book-series/azarinth-healer"],
  source: "kindle",
  externalId: "B0BZN1NT67",
  externalLink: "https://amazon.com/dp/B0BZN1NT67",
} as const satisfies Book
