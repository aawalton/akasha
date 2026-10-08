import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAntelucan = {
  id: "019db533-f390-77be-b946-721b07a17af5",
  type: "page-type/book",
  slug: "artorians-archives-antelucan",
  title: "Artorian's Archives: Antelucan",
  status: "not-started",
  unit: "unit/words",
  position: 13,
  ownLength: 118500,
  publishedAt: "2023-01-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BL57PVHX",
      externalLink: "https://amazon.com/dp/B0BL57PVHX",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
