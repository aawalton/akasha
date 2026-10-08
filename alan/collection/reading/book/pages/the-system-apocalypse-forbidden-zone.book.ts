import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseForbiddenZone = {
  id: "019db533-f391-7b74-97b2-5e4c9e66233d",
  type: "page-type/book",
  slug: "the-system-apocalypse-forbidden-zone",
  title: "The System Apocalypse: Forbidden Zone",
  status: "completed",
  unit: "unit/words",
  position: 11,
  ownLength: 107500,
  ownProgress: 107500,
  publishedAt: "2021-09-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09B84Y15P",
      externalLink: "https://amazon.com/dp/B09B84Y15P",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
