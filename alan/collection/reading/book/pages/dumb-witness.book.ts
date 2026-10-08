import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dumbWitness = {
  id: "019db533-f399-7ca0-a231-0181c220bc81",
  type: "page-type/book",
  slug: "dumb-witness",
  title: "Dumb Witness",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 14,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
