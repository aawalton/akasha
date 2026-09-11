import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const happierAtHome = {
  id: "019db533-f39e-7179-bca8-75088640c788",
  type: "book",
  slug: "happier-at-home",
  title: "Happier at Home",
  status: "not-started",
  author: "Gretchen Rubin",
  unit: "words",
  ownLength: 139950,
} as const satisfies Book
