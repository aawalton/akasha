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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
