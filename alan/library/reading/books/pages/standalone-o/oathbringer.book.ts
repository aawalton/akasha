import type { Book } from "../../book.page-type.ts"

export const oathbringer = {
  id: "019db533-f39d-7235-938e-bc2c373cffa6",
  pageTypeSlug: "book",
  slug: "oathbringer",
  title: "Oathbringer",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 4,
  ownLength: 310500,
  source: "kindle",
  externalId: "B01NAWAH85",
  externalLink: "https://www.amazon.com/dp/B01NAWAH85",
} as const satisfies Book
