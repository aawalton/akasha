import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theLoveClub = {
  id: "01a17497-195c-768e-a0e5-68e6bdc1388a",
  type: "page-type/franchise",
  slug: "the-love-club",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1084584",
      externalLink: "https://www.themoviedb.org/collection/1084584",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Club",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
