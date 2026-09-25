import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const adhdIsAwesome = {
  id: "019db533-f39e-725c-8b02-17d186e3ea03",
  type: "page-type/book",
  slug: "adhd-is-awesome",
  title: "ADHD Is Awesome",
  status: "not-started",
  author: "Penn Holderness, Kim Holderness",
  unit: "unit/words",
  ownLength: 132450,
} as const satisfies Book
