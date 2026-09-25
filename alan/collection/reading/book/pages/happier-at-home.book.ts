import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const happierAtHome = {
  id: "019db533-f39e-7179-bca8-75088640c788",
  type: "page-type/book",
  slug: "happier-at-home",
  title: "Happier at Home",
  status: "not-started",
  author: "Gretchen Rubin",
  unit: "unit/words",
  ownLength: 139950,
} as const satisfies Book
