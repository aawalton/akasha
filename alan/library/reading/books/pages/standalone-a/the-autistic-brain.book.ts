import type { Book } from "../../book.page-type.ts"

export const theAutisticBrain = {
  id: "019db533-f39e-707f-a2b8-13fcf7358e56",
  pageTypeSlug: "book",
  slug: "the-autistic-brain",
  title: "The Autistic Brain",
  status: "not-started",
  author: "Temple Grandin, Richard Panek",
  unitSlug: "words",
  ownLength: 121950,
} as const satisfies Book
