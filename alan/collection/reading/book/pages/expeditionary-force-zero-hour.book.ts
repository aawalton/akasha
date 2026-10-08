import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceZeroHour = {
  id: "019db533-f39a-7847-b018-954cb00db701",
  type: "page-type/book",
  slug: "expeditionary-force-zero-hour",
  title: "Expeditionary Force: Zero Hour",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 4,
  ownLength: 75250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0776H6QZR",
      externalLink: "https://www.amazon.com/dp/B0776H6QZR",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
