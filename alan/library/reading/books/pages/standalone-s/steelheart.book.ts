import type { Book } from "../../book.page-type.ts"

export const steelheart = {
  id: "019db533-f39d-70db-9a27-b1383e741547",
  pageTypeSlug: "book",
  slug: "steelheart",
  title: "Steelheart",
  status: "paused",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 96500,
  ownProgress: 9500,
  source: "kindle",
  externalId: "B00ARHAAZ6",
  externalLink: "https://www.amazon.com/dp/B00ARHAAZ6",
} as const satisfies Book
