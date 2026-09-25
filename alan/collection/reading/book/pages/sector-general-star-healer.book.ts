import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralStarHealer = {
  id: "019db533-f38b-73d0-a44e-3f5064050325",
  type: "page-type/book",
  slug: "sector-general-star-healer",
  title: "Sector General: Star Healer",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 6,
  ownLength: 54250,
  publishedAt: "1985-01-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345320891",
      externalLink: "https://amazon.com/dp/0345320891",
    },
  ],
} as const satisfies Book
