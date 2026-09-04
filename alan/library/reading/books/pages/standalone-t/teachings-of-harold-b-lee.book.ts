import type { Book } from "../../book.page-type.ts"

export const teachingsOfHaroldBLee = {
  id: "019db533-f39d-7a3a-bc7b-04400b1ca9a3",
  pageTypeSlug: "book",
  slug: "teachings-of-harold-b-lee",
  title: "Teachings of Harold B. Lee",
  status: "not-started",
  author: "Harold B. Lee",
  unitSlug: "words",
  position: 12,
  ownLength: 160000,
} as const satisfies Book
