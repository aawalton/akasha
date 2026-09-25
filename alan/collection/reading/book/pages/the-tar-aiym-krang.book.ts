import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theTarAiymKrang = {
  id: "019db533-f399-7b15-b6cb-f637b4aee776",
  type: "page-type/book",
  slug: "the-tar-aiym-krang",
  title: "The Tar-Aiym Krang",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 2,
} as const satisfies Book
