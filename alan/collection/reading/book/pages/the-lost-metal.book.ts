import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostMetal = {
  id: "019db533-f39d-71b1-9f9a-7b5d6a6ba27a",
  type: "page-type/book",
  slug: "the-lost-metal",
  title: "The Lost Metal",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 8,
  ownLength: 132000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09MBS37W9",
      externalLink: "https://www.amazon.com/dp/B09MBS37W9",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
