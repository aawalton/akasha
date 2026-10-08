import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAsgard = {
  id: "019db533-f390-77dc-bf61-24629ddc7c75",
  type: "page-type/book",
  slug: "artorians-archives-asgard",
  title: "Artorian's Archives: Asgard",
  status: "not-started",
  unit: "unit/words",
  position: 9,
  ownLength: 112750,
  publishedAt: "2021-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09L36RZVP",
      externalLink: "https://amazon.com/dp/B09L36RZVP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
