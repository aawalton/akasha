import type { Book } from "../../book.page-type.ts"

export const book1LifestealBook1 = {
  id: "019db533-f390-758f-8815-5732fe20604f",
  pageTypeSlug: "book",
  slug: "book-1-lifesteal-book-1",
  title: "1% Lifesteal",
  kind: "read",
  status: "not-started",
  author: "Edward Cuthbert Butler",
  unitSlug: "words",
  position: 1,
  ownLength: 151000,
  publishedAt: "2025-03-18",
  partOfSlugs: ["book-series-1-lifesteal"],
  source: "kindle",
  externalId: "B0DGWCDJSZ",
  externalLink: "https://amazon.com/dp/B0DGWCDJSZ",
} as const satisfies Book
