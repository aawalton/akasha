import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const murderInMesopotamia = {
  id: "019db533-f399-7d2a-8669-1b9f79c101cc",
  type: "page-type/book",
  slug: "murder-in-mesopotamia",
  title: "Murder in Mesopotamia",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 13,
} as const satisfies Book
