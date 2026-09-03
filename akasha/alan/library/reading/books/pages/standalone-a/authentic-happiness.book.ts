import type { Book } from "../../book.page-type.ts"

export const authenticHappiness = {
  id: "019db533-f39e-7205-989d-b882db4392d4",
  pageTypeSlug: "book",
  slug: "authentic-happiness",
  title: "Authentic Happiness",
  kind: "read",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unitSlug: "words",
  ownLength: 66300,
} as const satisfies Book
