import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisEnemyANTTheGates = {
  id: "019db533-f390-7ac4-90e4-aef968e7adcf",
  type: "page-type/book",
  slug: "chrysalis-enemy-a-n-t-the-gates",
  title: "Chrysalis: Enemy A(n)t the Gates",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 165500,
  ownProgress: 165500,
  publishedAt: "2024-01-31",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CM7DHMCG",
      externalLink: "https://amazon.com/dp/B0CM7DHMCG",
    },
  ],
} as const satisfies Book
