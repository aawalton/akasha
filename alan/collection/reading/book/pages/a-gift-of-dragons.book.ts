import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aGiftOfDragons = {
  id: "019db533-f399-7da0-a053-78d05bdc7a59",
  type: "page-type/book",
  slug: "a-gift-of-dragons",
  title: "A Gift of Dragons",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 25,
  ownLength: 76000,
} as const satisfies Book
