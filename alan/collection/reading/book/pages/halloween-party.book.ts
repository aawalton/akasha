import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const halloweenParty = {
  id: "019db533-f399-7d55-9367-c86f3e3d323d",
  type: "page-type/book",
  slug: "halloween-party",
  title: "Hallowe'en Party",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 31,
} as const satisfies Book
