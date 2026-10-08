import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceRenegades = {
  id: "019db533-f39a-7c18-90c2-f8de59019640",
  type: "page-type/book",
  slug: "expeditionary-force-renegades",
  title: "Expeditionary Force: Renegades",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 6,
  ownLength: 79000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07KMCKYRM",
      externalLink: "https://www.amazon.com/dp/B07KMCKYRM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
