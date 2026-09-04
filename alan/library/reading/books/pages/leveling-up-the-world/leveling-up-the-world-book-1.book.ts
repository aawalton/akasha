import type { Book } from "../../book.page-type.ts"

export const levelingUpTheWorldBook1 = {
  id: "019db533-f391-7183-a898-b407a3da8039",
  pageTypeSlug: "book",
  slug: "leveling-up-the-world-book-1",
  title: "Leveling Up The World",
  kind: "read",
  status: "completed",
  author: "Booker T. Washington",
  unitSlug: "words",
  position: 1,
  ownLength: 123000,
  ownProgress: 123000,
  publishedAt: "2023-02-28",
  partOfSlugs: ["book-series/leveling-up-the-world"],
  source: "kindle",
  externalId: "B0BHX9N31J",
  externalLink: "https://amazon.com/dp/B0BHX9N31J",
} as const satisfies Book
