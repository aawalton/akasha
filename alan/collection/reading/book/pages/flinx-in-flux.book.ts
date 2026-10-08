import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const flinxInFlux = {
  id: "019db533-f399-7aa0-954c-083f8c85d9de",
  type: "page-type/book",
  slug: "flinx-in-flux",
  title: "Flinx in Flux",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 6,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
