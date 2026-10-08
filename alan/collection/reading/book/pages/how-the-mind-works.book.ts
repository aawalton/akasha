import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const howTheMindWorks = {
  id: "019db533-f39e-7112-86ce-c9347ede9d4d",
  type: "page-type/book",
  slug: "how-the-mind-works",
  title: "How the Mind Works",
  status: "completed",
  grade: "C",
  author: "Steven Pinker, Mel Foster, 3",
  unit: "unit/words",
  ownLength: 391200,
  ownProgress: 391200,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
