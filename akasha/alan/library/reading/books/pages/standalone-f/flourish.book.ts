import type { Book } from "../../book.page-type.ts"

export const flourish = {
  id: "019db533-f39e-7142-8f1c-9e399db40a8d",
  pageTypeSlug: "book",
  slug: "flourish",
  title: "Flourish",
  kind: "read",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unitSlug: "words",
  ownLength: 142500,
} as const satisfies Book
