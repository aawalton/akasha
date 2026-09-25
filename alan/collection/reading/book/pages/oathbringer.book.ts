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
} as const satisfies Book
