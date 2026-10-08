import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const elephantsCanRemember = {
  id: "019db533-f399-7b80-a2ed-12a3762797bb",
  type: "page-type/book",
  slug: "elephants-can-remember",
  title: "Elephants Can Remember",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 32,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
