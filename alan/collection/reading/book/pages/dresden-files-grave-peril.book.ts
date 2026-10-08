import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesGravePeril = {
  id: "019db533-f39b-7122-b35c-f7d76ca5c6ec",
  type: "page-type/book",
  slug: "dresden-files-grave-peril",
  title: "Dresden Files: Grave Peril",
  status: "not-started",
  author: "Jim Butcher, James Marsters",
  unit: "unit/words",
  position: 2,
  ownLength: 116250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001650UDA",
      externalLink: "https://www.amazon.com/dp/B001650UDA",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
