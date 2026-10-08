import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oathbringer = {
  id: "019db533-f39d-7235-938e-bc2c373cffa6",
  type: "page-type/book",
  slug: "oathbringer",
  title: "Oathbringer",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 4,
  ownLength: 310500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01NAWAH85",
      externalLink: "https://www.amazon.com/dp/B01NAWAH85",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
