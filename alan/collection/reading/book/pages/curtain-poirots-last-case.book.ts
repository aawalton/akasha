import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const curtainPoirotsLastCase = {
  id: "019db533-f399-7b60-977d-fe8b9f34eaa8",
  type: "page-type/book",
  slug: "curtain-poirots-last-case",
  title: "Curtain: Poirot's Last Case",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 33,
} as const satisfies Book
