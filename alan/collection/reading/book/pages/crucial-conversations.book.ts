import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const crucialConversations = {
  id: "019db533-f39e-7215-81a3-a9506067bd0f",
  type: "page-type/book",
  slug: "crucial-conversations",
  title: "Crucial Conversations",
  status: "not-started",
  author: "Kerry Patterson, Joseph Grenny, Ron McMillan, Al Switzler, Stephen R. Covey",
  unit: "unit/words",
  ownLength: 64200,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
