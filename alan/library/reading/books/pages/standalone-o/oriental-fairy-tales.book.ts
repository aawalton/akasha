import type { Book } from "../../book.page-type.ts"

export const orientalFairyTales = {
  id: "019db533-f39d-7a41-887b-e4f78c852b41",
  pageTypeSlug: "book",
  slug: "oriental-fairy-tales",
  title: "Oriental Fairy Tales",
  status: "not-started",
  author: "Edwin Arnold",
  unitSlug: "words",
  position: 6,
  ownLength: 156250,
} as const satisfies Book
