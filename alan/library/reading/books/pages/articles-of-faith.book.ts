import type { Book } from "../book.page-type.types.ts"

export const articlesOfFaith = {
  id: "019db533-f39d-755f-a38c-b9163c10ff4c",
  pageTypeSlug: "book",
  type: "book",
  slug: "articles-of-faith",
  title: "Articles of Faith",
  status: "not-started",
  author: "Ronald Harwood",
  unit: "words",
  position: 2,
  ownLength: 88750,
} as const satisfies Book
