import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfHowardWHunter = {
  id: "019db533-f39d-7a89-97d5-d8e9472890ad",
  type: "page-type/book",
  slug: "teachings-of-howard-w-hunter",
  title: "Teachings of Howard W. Hunter",
  status: "not-started",
  author: "Howard W. Hunter",
  unit: "unit/words",
  position: 15,
  ownLength: 67750,
} as const satisfies Book
