import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whySmartKidsWorry = {
  id: "019db533-f39d-7e47-9412-da77e9ee2cde",
  type: "page-type/book",
  slug: "why-smart-kids-worry",
  title: "Why Smart Kids Worry",
  status: "not-started",
  author: "Allison Edwards",
  unit: "unit/words",
  ownLength: 98550,
} as const satisfies Book
