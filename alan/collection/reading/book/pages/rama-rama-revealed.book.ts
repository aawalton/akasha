import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ramaRamaRevealed = {
  id: "019db533-f39a-7c0b-adc6-744f10f0715a",
  type: "page-type/book",
  slug: "rama-rama-revealed",
  title: "Rama: Rama Revealed",
  status: "not-started",
  author: "Arthur C. Clarke",
  unit: "unit/words",
  position: 3,
  ownLength: 156500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07XF9TPRY",
      externalLink: "https://www.amazon.com/dp/B07XF9TPRY",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
