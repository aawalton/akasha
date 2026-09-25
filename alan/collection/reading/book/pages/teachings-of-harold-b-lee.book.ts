import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfHaroldBLee = {
  id: "019db533-f39d-7a3a-bc7b-04400b1ca9a3",
  type: "page-type/book",
  slug: "teachings-of-harold-b-lee",
  title: "Teachings of Harold B. Lee",
  status: "not-started",
  author: "Harold B. Lee",
  unit: "unit/words",
  position: 12,
  ownLength: 160000,
} as const satisfies Book
