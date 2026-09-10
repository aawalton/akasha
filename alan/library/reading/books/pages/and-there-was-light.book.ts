import type { Book } from "../book.page-type.types.ts"

export const andThereWasLight = {
  id: "019db533-f39d-7c47-8b7f-d9d8477ba417",
  pageTypeSlug: "book",
  type: "book",
  slug: "and-there-was-light",
  title: "And There Was Light",
  status: "completed",
  rank: "B",
  author: "Jon Meacham",
  unit: "words",
  position: 5,
  ownLength: 78000,
  ownProgress: 78000,
} as const satisfies Book
