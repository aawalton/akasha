import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const unmaskingAutism = {
  id: "019db533-f39d-7de1-b266-08b35ba3e727",
  type: "page-type/book",
  slug: "unmasking-autism",
  title: "Unmasking Autism",
  status: "not-started",
  author: "Devon Price",
  unit: "unit/words",
  ownLength: 147750,
} as const satisfies Book
