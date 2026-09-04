import type { Book } from "../../book.page-type.ts"

export const motherOfLearning4 = {
  id: "019db533-f391-732e-ab9e-e87058b183ac",
  pageTypeSlug: "book",
  slug: "mother-of-learning-4",
  title: "Mother of Learning 4",
  kind: "read",
  status: "completed",
  author: "James McBride",
  unitSlug: "words",
  position: 4,
  ownLength: 150250,
  ownProgress: 150250,
  publishedAt: "2023-04-04",
  partOfSlugs: ["book-series/mother-of-learning"],
  source: "kindle",
  externalId: "B0BWSCYLRQ",
  externalLink: "https://amazon.com/dp/B0BWSCYLRQ",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
