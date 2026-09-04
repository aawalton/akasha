import type { Book } from "../../book.page-type.ts"

export const thinkingFastAndSlow = {
  id: "019db533-f39d-7e5e-a9e5-c3f01ae2f997",
  pageTypeSlug: "book",
  slug: "thinking-fast-and-slow",
  title: "Thinking, Fast and Slow",
  kind: "read",
  status: "completed",
  rank: "S",
  author: "Daniel Kahneman, Daniel Kahneman",
  unitSlug: "words",
  ownLength: 300450,
  ownProgress: 300450,
} as const satisfies Book
