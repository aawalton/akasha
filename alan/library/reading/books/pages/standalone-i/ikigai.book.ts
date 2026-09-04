import type { Book } from "../../book.page-type.ts"

export const ikigai = {
  id: "019db533-f39e-7019-96ff-275f8741274a",
  pageTypeSlug: "book",
  slug: "ikigai",
  title: "Ikigai",
  status: "not-started",
  author: "Héctor García, Francesc Miralles",
  unitSlug: "words",
  ownLength: 49500,
} as const satisfies Book
