import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thinkLikeAFreak = {
  id: "019db533-f39d-7e1f-842e-7c42d8bfcc50",
  type: "page-type/book",
  slug: "think-like-a-freak",
  title: "Think Like a Freak",
  status: "not-started",
  author: "Steven D. Levitt, Stephen J. Dubner",
  unit: "unit/words",
  ownLength: 106200,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
