import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theAlloyOfLaw = {
  id: "019db533-f39d-70b3-9d49-58e3c4e1f6e1",
  type: "page-type/book",
  slug: "the-alloy-of-law",
  title: "The Alloy of Law",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 5,
  ownLength: 77750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00540QR7Q",
      externalLink: "https://www.amazon.com/dp/B00540QR7Q",
    },
  ],
} as const satisfies Book
