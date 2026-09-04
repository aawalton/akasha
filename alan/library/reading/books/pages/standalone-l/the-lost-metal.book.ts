import type { Book } from "../../book.page-type.ts"

export const theLostMetal = {
  id: "019db533-f39d-71b1-9f9a-7b5d6a6ba27a",
  pageTypeSlug: "book",
  slug: "the-lost-metal",
  title: "The Lost Metal",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 8,
  ownLength: 132000,
  source: "kindle",
  externalId: "B09MBS37W9",
  externalLink: "https://www.amazon.com/dp/B09MBS37W9",
} as const satisfies Book
