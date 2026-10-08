import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ikigai = {
  id: "019db533-f39e-7019-96ff-275f8741274a",
  type: "page-type/book",
  slug: "ikigai",
  title: "Ikigai",
  status: "not-started",
  author: "Héctor García, Francesc Miralles",
  unit: "unit/words",
  ownLength: 49500,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
