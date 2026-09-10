import type { Book } from "../book.page-type.types.ts"

export const spencerWKimball = {
  id: "019db533-f39d-7a04-b04b-ef81ed78fee2",
  pageTypeSlug: "book",
  type: "book",
  slug: "spencer-w-kimball",
  title: "Spencer W. Kimball",
  status: "not-started",
  author: "Spencer W. Kimball",
  unit: "words",
  position: 7,
  ownLength: 106750,
} as const satisfies Book
