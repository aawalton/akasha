import type { Book } from "../../book.page-type.ts"

export const thirdGirl = {
  id: "019db533-f399-7c60-af0d-b54a804a952e",
  pageTypeSlug: "book",
  slug: "third-girl",
  title: "Third Girl",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 30,
} as const satisfies Book
