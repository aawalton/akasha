import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const donQuixoteDeLaMancha = {
  id: "019db533-f39d-7b13-9e1a-799676c191f1",
  type: "page-type/book",
  slug: "don-quixote-de-la-mancha",
  title: "Don Quixote de la Mancha",
  status: "not-started",
  author: "Miguel de Cervantes Saavedra",
  unit: "unit/words",
  position: 11,
  ownLength: 156250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
