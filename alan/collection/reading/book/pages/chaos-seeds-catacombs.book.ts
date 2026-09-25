import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsCatacombs = {
  id: "019db533-f390-7a94-ae90-a246f436d905",
  type: "page-type/book",
  slug: "chaos-seeds-catacombs",
  title: "Chaos Seeds: Catacombs",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 4,
  ownLength: 92000,
  ownProgress: 92000,
  publishedAt: "2016-06-03",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01GLSCUM0",
      externalLink: "https://amazon.com/dp/B01GLSCUM0",
    },
  ],
} as const satisfies Book
