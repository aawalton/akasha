import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceFallout = {
  id: "019db533-f39a-7fa2-abc5-eaf98ca1c1e1",
  type: "page-type/book",
  slug: "expeditionary-force-fallout",
  title: "Expeditionary Force: Fallout",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 12,
  ownLength: 139500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09L79GGYV",
      externalLink: "https://www.amazon.com/dp/B09L79GGYV",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
