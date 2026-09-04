import type { Book } from "../../book.page-type.ts"

export const theNewWorldBook1 = {
  id: "019db533-f391-7a21-8be1-a339ff7d95c0",
  pageTypeSlug: "book",
  slug: "the-new-world-book-1",
  title: "The New World",
  status: "completed",
  author: "Pat Robertson",
  unitSlug: "words",
  position: 1,
  ownLength: 212250,
  ownProgress: 212250,
  publishedAt: "2023-05-09",
  source: "kindle",
  externalId: "B0BLMPN65G",
  externalLink: "https://amazon.com/dp/B0BLMPN65G",
} as const satisfies Book
