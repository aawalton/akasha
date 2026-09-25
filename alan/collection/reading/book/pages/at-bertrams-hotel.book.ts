import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const atBertramsHotel = {
  id: "019db533-f399-7b75-b1c2-c83d5fa490ba",
  type: "page-type/book",
  slug: "at-bertrams-hotel",
  title: "At Bertram's Hotel",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 11,
} as const satisfies Book
