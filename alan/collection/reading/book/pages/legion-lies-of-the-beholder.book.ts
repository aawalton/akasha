import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const legionLiesOfTheBeholder = {
  id: "019db533-f39d-709b-9e18-37abba5470c4",
  type: "page-type/book",
  slug: "legion-lies-of-the-beholder",
  title: "Legion: Lies of the Beholder",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 37000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B084V2FF6Q",
      externalLink: "https://www.amazon.com/dp/B084V2FF6Q",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
