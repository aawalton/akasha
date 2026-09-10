import type { Book } from "../book.page-type.types.ts"

export const theFourthTurning = {
  id: "019db533-f39d-78be-b97f-1d72f49d6cd9",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-fourth-turning",
  title: "The Fourth Turning",
  status: "not-started",
  author: "William Strauss, Neil Howe",
  unit: "words",
  position: 5,
  ownLength: 83500,
} as const satisfies Book
