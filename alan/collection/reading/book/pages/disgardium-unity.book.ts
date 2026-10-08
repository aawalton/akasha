import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumUnity = {
  id: "019db533-f390-7d77-bf71-acff4ca59fc8",
  type: "page-type/book",
  slug: "disgardium-unity",
  title: "Disgardium: Unity",
  status: "not-started",
  unit: "unit/words",
  position: 12,
  ownLength: 135750,
  publishedAt: "2023-05-17",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BZ65MW45",
      externalLink: "https://amazon.com/dp/B0BZ65MW45",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
