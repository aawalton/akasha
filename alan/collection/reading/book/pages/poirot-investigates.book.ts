import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const poirotInvestigates = {
  id: "019db533-f399-7d6b-a975-7efb3c489b8f",
  type: "page-type/book",
  slug: "poirot-investigates",
  title: "Poirot Investigates",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 3,
  ownLength: 77500,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
