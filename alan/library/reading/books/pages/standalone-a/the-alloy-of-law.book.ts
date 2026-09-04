import type { Book } from "../../book.page-type.ts"

export const theAlloyOfLaw = {
  id: "019db533-f39d-70b3-9d49-58e3c4e1f6e1",
  pageTypeSlug: "book",
  slug: "the-alloy-of-law",
  title: "The Alloy of Law",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 5,
  ownLength: 77750,
  source: "kindle",
  externalId: "B00540QR7Q",
  externalLink: "https://www.amazon.com/dp/B00540QR7Q",
} as const satisfies Book
