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
} as const satisfies Book
