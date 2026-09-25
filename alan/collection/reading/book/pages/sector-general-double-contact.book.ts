import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralDoubleContact = {
  id: "019db533-f39b-724d-a631-bdc27170412a",
  type: "page-type/book",
  slug: "sector-general-double-contact",
  title: "Sector General: Double Contact",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 11,
  ownLength: 79750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B016VCHZ1M",
      externalLink: "https://www.amazon.com/dp/B016VCHZ1M",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
