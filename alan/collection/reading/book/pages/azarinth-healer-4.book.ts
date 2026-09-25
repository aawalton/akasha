import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const azarinthHealer4 = {
  id: "019db533-f390-78a6-9273-48b943c53518",
  type: "page-type/book",
  slug: "azarinth-healer-4",
  title: "Azarinth Healer 4",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 189000,
  ownProgress: 189000,
  publishedAt: "2024-08-29",
  partOfCollections: ["book-series/azarinth-healer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DD7T24K2",
      externalLink: "https://amazon.com/dp/B0DD7T24K2",
    },
  ],
} as const satisfies Book
