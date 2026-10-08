import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const calamity = {
  id: "019db533-f39d-7040-9846-186c6e877c6e",
  type: "page-type/book",
  slug: "calamity",
  title: "Calamity",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 104000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00VZZ085G",
      externalLink: "https://www.amazon.com/dp/B00VZZ085G",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
