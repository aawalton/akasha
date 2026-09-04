import type { Book } from "../../book.page-type.ts"

export const makeItStick = {
  id: "019db533-f39e-7059-98d5-dadf188137c3",
  pageTypeSlug: "book",
  slug: "make-it-stick",
  title: "Make It Stick",
  kind: "read",
  status: "not-started",
  author: "Peter C. Brown, Henry L. Roediger, Mark A. McDaniel",
  unitSlug: "words",
  ownLength: 128550,
} as const satisfies Book
