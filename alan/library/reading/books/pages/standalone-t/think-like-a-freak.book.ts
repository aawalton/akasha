import type { Book } from "../../book.page-type.ts"

export const thinkLikeAFreak = {
  id: "019db533-f39d-7e1f-842e-7c42d8bfcc50",
  pageTypeSlug: "book",
  slug: "think-like-a-freak",
  title: "Think Like a Freak",
  status: "not-started",
  author: "Steven D. Levitt, Stephen J. Dubner",
  unitSlug: "words",
  ownLength: 106200,
} as const satisfies Book
