import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld4 = {
  id: "019db533-f391-715a-ae0f-1357152ab2c5",
  type: "page-type/book",
  slug: "leveling-up-the-world-4",
  title: "Leveling Up The World 4",
  status: "completed",
  author: "Houghton Mifflin Company Staff",
  unit: "unit/words",
  position: 4,
  ownLength: 178000,
  ownProgress: 178000,
  publishedAt: "2023-07-25",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BTMX7BW6",
      externalLink: "https://amazon.com/dp/B0BTMX7BW6",
    },
  ],
} as const satisfies Book
