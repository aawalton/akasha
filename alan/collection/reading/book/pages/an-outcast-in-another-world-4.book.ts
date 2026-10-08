import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const anOutcastInAnotherWorld4 = {
  id: "019db533-f390-772d-b4ea-47dce1a296df",
  type: "page-type/book",
  slug: "an-outcast-in-another-world-4",
  title: "An Outcast In Another World 4",
  status: "completed",
  author: "Roger Portal",
  unit: "unit/words",
  position: 4,
  ownLength: 185500,
  ownProgress: 185500,
  publishedAt: "2023-01-19",
  partOfCollections: ["book-series/an-outcast-in-another-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPT7V53L",
      externalLink: "https://amazon.com/dp/B0BPT7V53L",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
