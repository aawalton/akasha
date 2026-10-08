import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thinkingFastAndSlow = {
  id: "019db533-f39d-7e5e-a9e5-c3f01ae2f997",
  type: "page-type/book",
  slug: "thinking-fast-and-slow",
  title: "Thinking, Fast and Slow",
  status: "completed",
  grade: "S",
  author: "Daniel Kahneman, Daniel Kahneman",
  unit: "unit/words",
  ownLength: 300450,
  ownProgress: 300450,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
