import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfWilfordWoodruff = {
  id: "019db533-f39d-78ae-bc23-cd22aa538858",
  type: "page-type/book",
  slug: "teachings-of-wilford-woodruff",
  title: "Teachings of Wilford Woodruff",
  status: "not-started",
  author: "Wilford Woodruff",
  unit: "unit/words",
  position: 5,
  ownLength: 87500,
} as const satisfies Book
