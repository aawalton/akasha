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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
