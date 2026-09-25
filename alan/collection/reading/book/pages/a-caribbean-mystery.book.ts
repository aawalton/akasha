import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aCaribbeanMystery = {
  id: "019db533-f399-7b55-851a-9f79e6d78a4c",
  type: "page-type/book",
  slug: "a-caribbean-mystery",
  title: "A Caribbean Mystery",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 10,
} as const satisfies Book
