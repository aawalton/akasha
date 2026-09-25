import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theAutisticBrain = {
  id: "019db533-f39e-707f-a2b8-13fcf7358e56",
  type: "page-type/book",
  slug: "the-autistic-brain",
  title: "The Autistic Brain",
  status: "not-started",
  author: "Temple Grandin, Richard Panek",
  unit: "unit/words",
  ownLength: 121950,
} as const satisfies Book
