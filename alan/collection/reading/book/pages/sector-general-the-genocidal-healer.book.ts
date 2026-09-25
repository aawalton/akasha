import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralTheGenocidalHealer = {
  id: "019db533-f38b-7182-b206-251465ecc408",
  type: "page-type/book",
  slug: "sector-general-the-genocidal-healer",
  title: "Sector General: The Genocidal Healer",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 8,
  ownLength: 54750,
  publishedAt: "1992-01-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345371097",
      externalLink: "https://amazon.com/dp/0345371097",
    },
  ],
} as const satisfies Book
