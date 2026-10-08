import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBandsOfMourning = {
  id: "019db533-f39d-7225-acac-f3a0473c1439",
  type: "page-type/book",
  slug: "the-bands-of-mourning",
  title: "The Bands of Mourning",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 7,
  ownLength: 111750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00R697BC8",
      externalLink: "https://www.amazon.com/dp/B00R697BC8",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
