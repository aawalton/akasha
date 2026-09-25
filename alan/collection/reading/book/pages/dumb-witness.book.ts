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
} as const satisfies Book
