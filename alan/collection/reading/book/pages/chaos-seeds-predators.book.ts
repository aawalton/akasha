import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsPredators = {
  id: "019db533-f390-7a83-891f-3a1ee827b7fd",
  type: "page-type/book",
  slug: "chaos-seeds-predators",
  title: "Chaos Seeds: Predators",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 7,
  ownLength: 354750,
  ownProgress: 354750,
  publishedAt: "2018-02-16",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B079WCFZB8",
      externalLink: "https://amazon.com/dp/B079WCFZB8",
    },
  ],
} as const satisfies Book
