import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAcyrologia = {
  id: "019db533-f390-77f2-9254-bf1e439d9b06",
  type: "page-type/book",
  slug: "artorians-archives-acyrologia",
  title: "Artorian's Archives: Acyrologia",
  status: "not-started",
  unit: "unit/words",
  position: 10,
  ownLength: 112000,
  publishedAt: "2022-05-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09ZQ12VGR",
      externalLink: "https://amazon.com/dp/B09ZQ12VGR",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
