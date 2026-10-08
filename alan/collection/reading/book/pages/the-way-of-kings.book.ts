import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfKings = {
  id: "019db533-f39d-7006-970d-c25a8110a108",
  type: "page-type/book",
  slug: "the-way-of-kings",
  title: "The Way of Kings",
  status: "paused",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 301500,
  ownProgress: 83000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003P2WO5E",
      externalLink: "https://www.amazon.com/dp/B003P2WO5E",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
