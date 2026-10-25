import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const haulOutTheHolly = {
  id: "01a17497-1959-7fad-84fd-4c3172e3a69c",
  type: "page-type/franchise",
  slug: "haul-out-the-holly",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1188730",
      externalLink: "https://www.themoviedb.org/collection/1188730",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haul Out The Holly",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
