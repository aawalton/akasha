import type { Book } from "../../book.page-type.ts"

export const whatMakesLoveLast = {
  id: "019db533-f38a-7239-b3c1-efdfbdccbf45",
  pageTypeSlug: "book",
  slug: "what-makes-love-last",
  title: "What Makes Love Last?",
  status: "in-progress",
  author: "John Mordechai Gottman",
  unitSlug: "words",
  ownLength: 107000,
  publishedAt: "2012-09-04",
} as const satisfies Book
