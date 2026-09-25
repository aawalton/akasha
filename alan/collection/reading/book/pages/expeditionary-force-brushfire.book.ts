import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceBrushfire = {
  id: "019db533-f39b-72ea-b8fe-2a765823b760",
  type: "page-type/book",
  slug: "expeditionary-force-brushfire",
  title: "Expeditionary Force: Brushfire",
  status: "not-started",
  author: "Craig Alanson",
  unit: "unit/words",
  position: 10,
  ownLength: 98500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08KSGPBTF",
      externalLink: "https://www.amazon.com/dp/B08KSGPBTF",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
