import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetRelentless = {
  id: "019db533-f39a-78f0-b041-caa5fefd323f",
  type: "page-type/book",
  slug: "the-lost-fleet-relentless",
  title: "The Lost Fleet: Relentless",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  position: 4,
  ownLength: 84500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0020BUX0Y",
      externalLink: "https://www.amazon.com/dp/B0020BUX0Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
