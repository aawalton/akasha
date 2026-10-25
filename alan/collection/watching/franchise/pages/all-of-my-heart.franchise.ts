import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const allOfMyHeart = {
  id: "01a17497-1958-7ec1-bd40-21dcc6c16fca",
  type: "page-type/franchise",
  slug: "all-of-my-heart",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480160",
      externalLink: "https://www.themoviedb.org/collection/480160",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All of My Heart",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
