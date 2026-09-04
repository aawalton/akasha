import type { Book } from "../../book.page-type.ts"

export const jesusTheChrist = {
  id: "019db533-f39d-743d-9953-6cd76b5f01e5",
  pageTypeSlug: "book",
  slug: "jesus-the-christ",
  title: "Jesus The Christ",
  status: "not-started",
  author: "James Edward Talmage",
  unitSlug: "words",
  position: 1,
  ownLength: 137750,
} as const satisfies Book
