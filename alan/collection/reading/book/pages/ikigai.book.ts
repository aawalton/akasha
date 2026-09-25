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
} as const satisfies Book
