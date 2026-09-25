import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const riseOfTheDevourerDragonWarrior = {
  id: "019db533-f391-74c0-b4ae-5fae470bd92d",
  type: "page-type/book",
  slug: "rise-of-the-devourer-dragon-warrior",
  title: "Rise of the Devourer: Dragon Warrior",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 110750,
  publishedAt: "2024-07-03",
  partOfCollections: ["book-series/rise-of-the-devourer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CSL7F49D",
      externalLink: "https://amazon.com/dp/B0CSL7F49D",
    },
  ],
} as const satisfies Book
