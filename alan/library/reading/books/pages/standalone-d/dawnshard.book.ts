import type { Book } from "../../book.page-type.ts"

export const dawnshard = {
  id: "019db533-f39d-702a-99e3-96ba139416f2",
  pageTypeSlug: "book",
  type: "book",
  slug: "dawnshard",
  title: "Dawnshard",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "words",
  position: 5,
  ownLength: 69250,
} as const satisfies Book
