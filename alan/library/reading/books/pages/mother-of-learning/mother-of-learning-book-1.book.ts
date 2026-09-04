import type { Book } from "../../book.page-type.ts"

export const motherOfLearningBook1 = {
  id: "019db533-f391-7351-af00-60b52a447ce4",
  pageTypeSlug: "book",
  slug: "mother-of-learning-book-1",
  title: "Mother of Learning",
  status: "completed",
  author: "Domagoj Kurmaic",
  unitSlug: "words",
  position: 1,
  ownLength: 161250,
  ownProgress: 161250,
  publishedAt: "2021-12-01",
  partOfSlugs: ["book-series/mother-of-learning"],
  source: "kindle",
  externalId: "B09M2R6QLF",
  externalLink: "https://amazon.com/dp/B09M2R6QLF",
} as const satisfies Book
