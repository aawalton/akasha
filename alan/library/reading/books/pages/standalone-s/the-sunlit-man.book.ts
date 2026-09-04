import type { Book } from "../../book.page-type.ts"

export const theSunlitMan = {
  id: "019db533-f39d-7300-a974-3c4632cbbe5c",
  pageTypeSlug: "book",
  slug: "the-sunlit-man",
  title: "The Sunlit Man",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 9,
  ownLength: 111500,
  source: "kindle",
  externalId: "B0BPN84MD5",
  externalLink: "https://www.amazon.com/dp/B0BPN84MD5",
} as const satisfies Book
