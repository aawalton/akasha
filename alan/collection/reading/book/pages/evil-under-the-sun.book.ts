import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const evilUnderTheSun = {
  id: "019db533-f399-7c35-97c8-f390898a5502",
  type: "page-type/book",
  slug: "evil-under-the-sun",
  title: "Evil Under the Sun",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 20,
} as const satisfies Book
