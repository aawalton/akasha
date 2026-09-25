import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theAntidote = {
  id: "019db533-f39d-7fa7-92f8-53937235a01f",
  type: "page-type/book",
  slug: "the-antidote",
  title: "The Antidote",
  status: "not-started",
  author: "Oliver Burkeman, Martín Rodríguez-Courel Ginzo",
  unit: "unit/words",
  ownLength: 93300,
} as const satisfies Book
