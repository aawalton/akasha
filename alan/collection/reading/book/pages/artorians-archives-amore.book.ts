import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAmore = {
  id: "019db533-f390-777f-9de2-29ec9f8fc9d1",
  type: "page-type/book",
  slug: "artorians-archives-amore",
  title: "Artorian's Archives: Amore",
  status: "not-started",
  unit: "unit/words",
  position: 19,
  ownLength: 114000,
  publishedAt: "2024-10-23",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGRJX155",
      externalLink: "https://amazon.com/dp/B0DGRJX155",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
