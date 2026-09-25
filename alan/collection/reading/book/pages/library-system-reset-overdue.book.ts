import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const librarySystemResetOverdue = {
  id: "019db533-f391-71d0-a25b-457abdb50720",
  type: "page-type/book",
  slug: "library-system-reset-overdue",
  title: "Library System Reset: Overdue",
  status: "not-started",
  author: "K. T. Hanna",
  unit: "unit/words",
  position: 1,
  ownLength: 147750,
  publishedAt: "2024-07-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D3N46VWX",
      externalLink: "https://amazon.com/dp/B0D3N46VWX",
    },
  ],
} as const satisfies Book
