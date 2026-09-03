import type { Book } from "../../book.page-type.ts"

export const theSelfDrivenChild = {
  id: "019db533-f39d-7e4f-9bdc-2eb3fc22d382",
  pageTypeSlug: "book",
  slug: "the-self-driven-child",
  title: "The Self-Driven Child",
  kind: "read",
  status: "not-started",
  author: "William Stixrud PhD, Ned Johnson",
  unitSlug: "words",
  ownLength: 173700,
} as const satisfies Book
