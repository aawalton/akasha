import type { Book } from "../../book.page-type.ts"

export const wordsOfRadiance = {
  id: "019db533-f39c-7f54-9735-77fc2a61b9de",
  pageTypeSlug: "book",
  slug: "words-of-radiance",
  title: "Words of Radiance",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 271750,
  source: "kindle",
  externalId: "B00DA6YEKS",
  externalLink: "https://www.amazon.com/dp/B00DA6YEKS",
} as const satisfies Book
