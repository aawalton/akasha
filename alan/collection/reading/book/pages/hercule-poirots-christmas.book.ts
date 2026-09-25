import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const herculePoirotsChristmas = {
  id: "019db533-f399-7bc0-9d02-b7cea3822e6c",
  type: "page-type/book",
  slug: "hercule-poirots-christmas",
  title: "Hercule Poirot's Christmas",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 17,
} as const satisfies Book
