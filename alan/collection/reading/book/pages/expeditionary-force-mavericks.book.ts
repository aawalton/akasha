import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceMavericks = {
  id: "019db533-f39a-7f55-bd08-cf8aed43b6be",
  type: "page-type/book",
  slug: "expeditionary-force-mavericks",
  title: "Expeditionary Force: Mavericks",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 5,
  ownLength: 72750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07DG2TVWQ",
      externalLink: "https://www.amazon.com/dp/B07DG2TVWQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
