import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesSkinGame = {
  id: "019db533-f39a-7d3e-bff6-2020fa49a4c0",
  type: "page-type/book",
  slug: "dresden-files-skin-game",
  title: "Dresden Files: Skin Game",
  status: "not-started",
  author: "Jim Butcher, James Marsters",
  unit: "unit/words",
  position: 14,
  ownLength: 152250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00HUVUSZ4",
      externalLink: "https://www.amazon.com/dp/B00HUVUSZ4",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
