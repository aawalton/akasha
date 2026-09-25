import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const librarySystemResetDamaged = {
  id: "019db533-f391-71c2-b73f-ea7726632dd2",
  type: "page-type/book",
  slug: "library-system-reset-damaged",
  title: "Library System Reset: Damaged",
  status: "not-started",
  author: "K. T. Hanna",
  unit: "unit/words",
  position: 2,
  ownLength: 160750,
  publishedAt: "2024-09-10",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D88PNTZ7",
      externalLink: "https://amazon.com/dp/B0D88PNTZ7",
    },
  ],
} as const satisfies Book
