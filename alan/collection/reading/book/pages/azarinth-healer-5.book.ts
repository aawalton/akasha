import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const azarinthHealer5 = {
  id: "019db533-f390-78ad-8bac-e5001d508fff",
  type: "page-type/book",
  slug: "azarinth-healer-5",
  title: "Azarinth Healer 5",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 167500,
  ownProgress: 167500,
  publishedAt: "2025-04-29",
  partOfCollections: ["book-series/azarinth-healer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F2RKS2RD",
      externalLink: "https://amazon.com/dp/B0F2RKS2RD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
