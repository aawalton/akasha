import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wordsOfRadiance = {
  id: "019db533-f39c-7f54-9735-77fc2a61b9de",
  type: "page-type/book",
  slug: "words-of-radiance",
  title: "Words of Radiance",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 271750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00DA6YEKS",
      externalLink: "https://www.amazon.com/dp/B00DA6YEKS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.044Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
