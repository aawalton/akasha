import type { Book } from "../../book.page-type.ts"

export const blink = {
  id: "019db533-f39e-7152-a1a6-e24ba6646347",
  pageTypeSlug: "book",
  slug: "blink",
  title: "Blink",
  status: "not-started",
  author: "Malcolm Gladwell",
  unitSlug: "words",
  ownLength: 115950,
} as const satisfies Book
