import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const outOfTheDarkIntoTheLight = {
  id: "019db533-f39a-7f3b-8dbd-d412cee05b9a",
  type: "page-type/book",
  slug: "out-of-the-dark-into-the-light",
  title: "Out of the Dark: Into the Light",
  status: "not-started",
  author: "Alessia Stewart",
  unit: "unit/words",
  position: 1,
  ownLength: 125750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BKLY24N",
      externalLink: "https://www.amazon.com/dp/B08BKLY24N",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
