import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dreamland = {
  id: "019db533-f39e-7122-8783-d2af085b0b51",
  type: "page-type/book",
  slug: "dreamland",
  title: "Dreamland",
  status: "completed",
  author: "Sarah Dessen",
  unit: "unit/words",
  ownLength: 208800,
  ownProgress: 208800,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
