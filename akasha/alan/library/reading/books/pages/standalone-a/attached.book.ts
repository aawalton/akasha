import type { Book } from "../../book.page-type.ts"

export const attached = {
  id: "019db533-f39e-713a-a066-e325d765444d",
  pageTypeSlug: "book",
  slug: "attached",
  title: "Attached",
  kind: "read",
  status: "not-started",
  author: "Amir Levine",
  unitSlug: "words",
  ownLength: 107550,
} as const satisfies Book
