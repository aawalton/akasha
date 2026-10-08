import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const makeItStick = {
  id: "019db533-f39e-7059-98d5-dadf188137c3",
  type: "page-type/book",
  slug: "make-it-stick",
  title: "Make It Stick",
  status: "not-started",
  author: "Peter C. Brown, Henry L. Roediger, Mark A. McDaniel",
  unit: "unit/words",
  ownLength: 128550,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
