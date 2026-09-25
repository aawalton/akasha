import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const marchUpcountryWeFew = {
  id: "019db533-f39a-7813-80f0-f835cfd3f05b",
  type: "page-type/book",
  slug: "march-upcountry-we-few",
  title: "March Upcountry: We Few",
  status: "not-started",
  author: "John Ringo",
  unit: "unit/words",
  position: 3,
  ownLength: 120750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP91W76",
      externalLink: "https://www.amazon.com/dp/B00AP91W76",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
