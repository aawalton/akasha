import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const psychologyOfHumanBehavior = {
  id: "019db533-f39d-7fd6-b022-3cb594119883",
  type: "book",
  slug: "psychology-of-human-behavior",
  title: "Psychology of Human Behavior",
  status: "completed",
  author: "Nancy Lui",
  unit: "words",
  ownLength: 277500,
  ownProgress: 277500,
} as const satisfies Book
