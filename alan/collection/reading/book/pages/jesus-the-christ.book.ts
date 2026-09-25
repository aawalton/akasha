import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jesusTheChrist = {
  id: "019db533-f39d-743d-9953-6cd76b5f01e5",
  type: "page-type/book",
  slug: "jesus-the-christ",
  title: "Jesus The Christ",
  status: "not-started",
  author: "James Edward Talmage",
  unit: "unit/words",
  position: 1,
  ownLength: 137750,
} as const satisfies Book
