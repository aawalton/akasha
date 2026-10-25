import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theMistletoe = {
  id: "01a17497-195c-7a47-8ec9-e873c01cfabf",
  type: "page-type/franchise",
  slug: "the-mistletoe",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1156486",
      externalLink: "https://www.themoviedb.org/collection/1156486",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Mistletoe",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
