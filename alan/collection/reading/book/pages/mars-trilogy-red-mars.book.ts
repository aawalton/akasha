import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const marsTrilogyRedMars = {
  id: "019db533-f39a-7c67-886f-71d71cb3f121",
  type: "page-type/book",
  slug: "mars-trilogy-red-mars",
  title: "Mars Trilogy: Red Mars",
  status: "not-started",
  author: "Kim Stanley Robinson",
  unit: "unit/words",
  ownLength: 152000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000QCS914",
      externalLink: "https://www.amazon.com/dp/B000QCS914",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
