import type { Book } from "../../book.page-type.ts"

export const whatTheDogSaw = {
  id: "019db533-f39d-7ee8-9e7f-1cc79e04a0b3",
  pageTypeSlug: "book",
  slug: "what-the-dog-saw",
  title: "What the Dog Saw",
  kind: "read",
  status: "not-started",
  author: "Malcolm Gladwell",
  unitSlug: "words",
  ownLength: 191550,
} as const satisfies Book
