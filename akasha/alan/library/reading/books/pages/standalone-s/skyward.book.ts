import type { Book } from "../../book.page-type.ts"

export const skyward = {
  id: "019db533-f39c-7ff5-8135-891e7ee0c611",
  pageTypeSlug: "book",
  slug: "skyward",
  title: "Skyward",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 128250,
  ownProgress: 128250,
} as const satisfies Book
