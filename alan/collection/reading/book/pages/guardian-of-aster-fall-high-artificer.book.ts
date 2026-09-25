import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallHighArtificer = {
  id: "019db533-f390-7fcc-bccf-f948336ae536",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-high-artificer",
  title: "Guardian of Aster Fall: High Artificer",
  status: "completed",
  unit: "unit/words",
  position: 9,
  ownLength: 134000,
  ownProgress: 134000,
  publishedAt: "2025-01-29",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGW4WMN8",
      externalLink: "https://amazon.com/dp/B0DGW4WMN8",
    },
  ],
} as const satisfies Book
