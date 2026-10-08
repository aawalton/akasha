import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceValkyrie = {
  id: "019db533-f39a-7961-bafc-f00087f85242",
  type: "page-type/book",
  slug: "expeditionary-force-valkyrie",
  title: "Expeditionary Force: Valkyrie",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 8,
  ownLength: 99500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08253WST7",
      externalLink: "https://www.amazon.com/dp/B08253WST7",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
