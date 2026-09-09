import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter3 = {
  id: "019db533-f391-7a7a-9625-2e0e43fbbb7b",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-primal-hunter-3",
  title: "The Primal Hunter 3",
  status: "completed",
  author: "Zogarth",
  unit: "words",
  position: 3,
  ownLength: 133000,
  ownProgress: 133000,
  publishedAt: "2022-08-30",
  partOfCollections: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0B2X2HFL4",
  externalLink: "https://amazon.com/dp/B0B2X2HFL4",
} as const satisfies Book
