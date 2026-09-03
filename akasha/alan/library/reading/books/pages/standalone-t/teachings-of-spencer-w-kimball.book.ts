import type { Book } from "../../book.page-type.ts"

export const teachingsOfSpencerWKimball = {
  id: "019db533-f39d-78f6-b47f-c5c6fce46bb9",
  pageTypeSlug: "book",
  slug: "teachings-of-spencer-w-kimball",
  title: "Teachings of Spencer W. Kimball",
  kind: "read",
  status: "not-started",
  author: "Spencer W. Kimball",
  unitSlug: "words",
  position: 13,
  ownLength: 155000,
} as const satisfies Book
