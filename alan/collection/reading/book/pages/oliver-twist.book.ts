import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oliverTwist = {
  id: "019db533-f39d-7aed-b5d0-95049b81760d",
  type: "page-type/book",
  slug: "oliver-twist",
  title: "Oliver Twist",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 3,
  ownLength: 104500,
} as const satisfies Book
