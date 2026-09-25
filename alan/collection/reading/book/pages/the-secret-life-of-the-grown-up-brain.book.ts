import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecretLifeOfTheGrownUpBrain = {
  id: "019db533-f39d-7e87-a07a-775604f8f5a4",
  type: "page-type/book",
  slug: "the-secret-life-of-the-grown-up-brain",
  title: "The Secret Life of the Grown-Up Brain",
  status: "not-started",
  author: "Barbara Strauch",
  unit: "unit/words",
  ownLength: 103050,
} as const satisfies Book
