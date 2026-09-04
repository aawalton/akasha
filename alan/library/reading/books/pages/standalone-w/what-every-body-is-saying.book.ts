import type { Book } from "../../book.page-type.ts"

export const whatEveryBodyIsSaying = {
  id: "019db533-f39d-7e9e-9929-88b5bc3f3c39",
  pageTypeSlug: "book",
  slug: "what-every-body-is-saying",
  title: "What Every BODY Is Saying",
  kind: "read",
  status: "not-started",
  author: "Joe Navarro, Marvin Karlins",
  unitSlug: "words",
  ownLength: 109800,
} as const satisfies Book
