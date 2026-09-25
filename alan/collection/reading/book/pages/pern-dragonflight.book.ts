import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonflight = {
  id: "019db533-f39b-7317-9dd5-2a10584432cc",
  type: "page-type/book",
  slug: "pern-dragonflight",
  title: "Pern: Dragonflight",
  status: "paused",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 15,
  ownLength: 80000,
  ownProgress: 1500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOCI",
      externalLink: "https://www.amazon.com/dp/B000FBFOCI",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
