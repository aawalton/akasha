import type { Book } from "../book.page-type.types.ts"

export const theSelfDrivenChild = {
  id: "019db533-f39d-7e4f-9bdc-2eb3fc22d382",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-self-driven-child",
  title: "The Self-Driven Child",
  status: "not-started",
  author: "William Stixrud PhD, Ned Johnson",
  unit: "words",
  ownLength: 173700,
} as const satisfies Book
