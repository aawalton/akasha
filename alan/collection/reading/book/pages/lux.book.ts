import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const lux = {
  id: "019db533-f39d-7083-ba28-d40487c67720",
  type: "page-type/book",
  slug: "lux",
  title: "Lux",
  status: "not-started",
  author: "Jennifer L. Armentrout",
  unit: "unit/words",
  position: 5,
} as const satisfies Book
