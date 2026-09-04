import type { Book } from "../../book.page-type.ts"

export const theBandsOfMourning = {
  id: "019db533-f39d-7225-acac-f3a0473c1439",
  pageTypeSlug: "book",
  slug: "the-bands-of-mourning",
  title: "The Bands of Mourning",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 7,
  ownLength: 111750,
  source: "kindle",
  externalId: "B00R697BC8",
  externalLink: "https://www.amazon.com/dp/B00R697BC8",
} as const satisfies Book
