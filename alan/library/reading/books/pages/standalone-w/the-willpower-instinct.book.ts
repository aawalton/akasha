import type { Book } from "../../book.page-type.ts"

export const theWillpowerInstinct = {
  id: "019db533-f39d-7f5c-9112-ebca1497da28",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-willpower-instinct",
  title: "The Willpower Instinct",
  status: "not-started",
  author: "Kelly McGonigal",
  unit: "words",
  ownLength: 125250,
} as const satisfies Book
