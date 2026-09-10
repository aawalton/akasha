import type { Book } from "../book.page-type.types.ts"

export const theLittleBookOfTalent = {
  id: "019db533-f39d-7e27-a62e-78f61d01f96d",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-little-book-of-talent",
  title: "The Little Book of Talent",
  status: "completed",
  rank: "A",
  author: "Daniel Coyle",
  unit: "words",
  ownLength: 27750,
  ownProgress: 27750,
} as const satisfies Book
