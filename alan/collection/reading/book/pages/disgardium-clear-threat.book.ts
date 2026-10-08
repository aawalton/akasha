import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumClearThreat = {
  id: "019db533-f390-7d6f-9e83-264690ae4841",
  type: "page-type/book",
  slug: "disgardium-clear-threat",
  title: "Disgardium: Clear Threat",
  status: "not-started",
  unit: "unit/words",
  position: 10,
  ownLength: 137750,
  publishedAt: "2022-02-25",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09MMJJHVG",
      externalLink: "https://amazon.com/dp/B09MMJJHVG",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
