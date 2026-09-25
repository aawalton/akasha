import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureSurfaceDetail = {
  id: "019db533-f39a-7ae3-9e24-dd0b148d3f20",
  type: "page-type/book",
  slug: "culture-surface-detail",
  title: "Culture: Surface Detail",
  status: "not-started",
  author: "Iain Banks",
  unit: "unit/words",
  position: 7,
  ownLength: 156250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0046A9NLC",
      externalLink: "https://www.amazon.com/dp/B0046A9NLC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
