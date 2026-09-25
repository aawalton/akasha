import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisFatedAntagonist = {
  id: "019db533-f390-7aac-a049-9b9741ee5141",
  type: "page-type/book",
  slug: "chrysalis-fated-antagonist",
  title: "Chrysalis: Fated Antagonist",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 197500,
  ownProgress: 197500,
  publishedAt: "2025-06-18",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F63LL1WH",
      externalLink: "https://amazon.com/dp/B0F63LL1WH",
    },
  ],
} as const satisfies Book
