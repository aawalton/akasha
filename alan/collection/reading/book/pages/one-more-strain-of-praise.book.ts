import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oneMoreStrainOfPraise = {
  id: "019db533-f39d-705d-9a96-32794cbe0aa5",
  type: "page-type/book",
  slug: "one-more-strain-of-praise",
  title: "One More Strain of Praise",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 4,
  ownLength: 35250,
  ownProgress: 35250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
