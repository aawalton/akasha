import type { Book } from "../../book.page-type.ts"

export const supercommunicators = {
  id: "019db533-f39e-7067-ba30-20cbb6726512",
  pageTypeSlug: "book",
  slug: "supercommunicators",
  title: "Supercommunicators",
  status: "not-started",
  author: "Charles Duhigg",
  unitSlug: "words",
  ownLength: 112050,
} as const satisfies Book
