import type { Book } from "../../book.page-type.ts"

export const warbreaker = {
  id: "019db533-f39d-7337-90d4-df0cb121d663",
  pageTypeSlug: "book",
  slug: "warbreaker",
  title: "Warbreaker",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 4,
  ownLength: 159500,
  source: "kindle",
  externalId: "B087JNJKMS",
  externalLink: "https://www.amazon.com/dp/B087JNJKMS",
} as const satisfies Book
