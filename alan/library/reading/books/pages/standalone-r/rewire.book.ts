import type { Book } from "../../book.page-type.ts"

export const rewire = {
  id: "019db533-f39e-7060-9558-251a590c33fd",
  pageTypeSlug: "book",
  slug: "rewire",
  title: "Rewire",
  kind: "read",
  status: "not-started",
  author: "O'Connor, Richard (Psychotherapist), Richard O'Connor",
  unitSlug: "words",
  ownLength: 154500,
} as const satisfies Book
