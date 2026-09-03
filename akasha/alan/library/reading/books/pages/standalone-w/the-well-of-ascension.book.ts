import type { Book } from "../../book.page-type.ts"

export const theWellOfAscension = {
  id: "019db533-f39c-7f64-bbd6-1f197e209e73",
  pageTypeSlug: "book",
  slug: "the-well-of-ascension",
  title: "The Well of Ascension",
  kind: "read",
  status: "paused",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 199250,
  ownProgress: 31250,
  source: "kindle",
  externalId: "B000UZQI0Q",
  externalLink: "https://www.amazon.com/dp/B000UZQI0Q",
} as const satisfies Book
