import type { Book } from "../../book.page-type.ts"

export const crucialConversations = {
  id: "019db533-f39e-7215-81a3-a9506067bd0f",
  pageTypeSlug: "book",
  slug: "crucial-conversations",
  title: "Crucial Conversations",
  status: "not-started",
  author: "Kerry Patterson, Joseph Grenny, Ron McMillan, Al Switzler, Stephen R. Covey",
  unitSlug: "words",
  ownLength: 64200,
} as const satisfies Book
