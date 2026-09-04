import type { Book } from "../../book.page-type.ts"

export const theSecretLifeOfTheGrownUpBrain = {
  id: "019db533-f39d-7e87-a07a-775604f8f5a4",
  pageTypeSlug: "book",
  slug: "the-secret-life-of-the-grown-up-brain",
  title: "The Secret Life of the Grown-Up Brain",
  kind: "read",
  status: "not-started",
  author: "Barbara Strauch",
  unitSlug: "words",
  ownLength: 103050,
} as const satisfies Book
