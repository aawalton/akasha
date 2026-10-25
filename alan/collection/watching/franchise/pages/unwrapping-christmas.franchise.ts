import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const unwrappingChristmas = {
  id: "01a17497-195c-78a2-b19a-8b748ad3bf04",
  type: "page-type/franchise",
  slug: "unwrapping-christmas",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359247",
      externalLink: "https://www.themoviedb.org/collection/1359247",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unwrapping Christmas",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
