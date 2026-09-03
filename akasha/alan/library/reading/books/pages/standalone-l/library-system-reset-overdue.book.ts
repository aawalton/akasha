import type { Book } from "../../book.page-type.ts"

export const librarySystemResetOverdue = {
  id: "019db533-f391-71d0-a25b-457abdb50720",
  pageTypeSlug: "book",
  slug: "library-system-reset-overdue",
  title: "Library System Reset: Overdue",
  kind: "read",
  status: "not-started",
  author: "K. T. Hanna",
  unitSlug: "words",
  position: 1,
  ownLength: 147750,
  publishedAt: "2024-07-02",
  source: "kindle",
  externalId: "B0D3N46VWX",
  externalLink: "https://amazon.com/dp/B0D3N46VWX",
} as const satisfies Book
