import type { Book } from "../../book.page-type.ts"

export const calamity = {
  id: "019db533-f39d-7040-9846-186c6e877c6e",
  pageTypeSlug: "book",
  slug: "calamity",
  title: "Calamity",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 104000,
  source: "kindle",
  externalId: "B00VZZ085G",
  externalLink: "https://www.amazon.com/dp/B00VZZ085G",
} as const satisfies Book
