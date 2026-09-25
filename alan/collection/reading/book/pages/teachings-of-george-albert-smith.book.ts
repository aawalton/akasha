import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfGeorgeAlbertSmith = {
  id: "019db533-f39d-7961-bc39-7d31984b1c3e",
  type: "page-type/book",
  slug: "teachings-of-george-albert-smith",
  title: "Teachings of George Albert Smith",
  status: "not-started",
  author: "Smith, George Albert",
  unit: "unit/words",
  position: 9,
  ownLength: 49000,
} as const satisfies Book
