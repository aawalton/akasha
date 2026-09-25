import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const brainStorms = {
  id: "019db533-f39e-7103-8d1b-10abc7b5b453",
  type: "page-type/book",
  slug: "brain-storms",
  title: "Brain Storms",
  status: "not-started",
  author: "Jon Palfreman",
  unit: "unit/words",
  ownLength: 118050,
} as const satisfies Book
