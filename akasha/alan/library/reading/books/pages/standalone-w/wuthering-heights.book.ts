import type { Book } from "../../book.page-type.ts"

export const wutheringHeights = {
  id: "019db533-f39d-75c7-a08f-28e2179f0faa",
  pageTypeSlug: "book",
  slug: "wuthering-heights",
  title: "Wuthering Heights",
  kind: "read",
  status: "not-started",
  author: "Emily Brontë",
  unitSlug: "words",
  position: 5,
  ownLength: 100250,
} as const satisfies Book
