import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theWeddingVeil = {
  id: "01a17497-195c-791b-9c14-ceb6da2f4482",
  type: "page-type/franchise",
  slug: "the-wedding-veil",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "941070",
      externalLink: "https://www.themoviedb.org/collection/941070",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
