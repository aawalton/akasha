import type { Book } from "../../book.page-type.ts"

export const martinChuzzlewit = {
  id: "019db533-f39d-7a23-a769-e103deaa2a36",
  pageTypeSlug: "book",
  slug: "martin-chuzzlewit",
  title: "Martin Chuzzlewit",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 6,
  ownLength: 211000,
} as const satisfies Book
