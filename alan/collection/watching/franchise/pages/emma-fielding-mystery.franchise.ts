import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const emmaFieldingMystery = {
  id: "01a17497-1959-785d-b381-3b9dd2f70a04",
  type: "page-type/franchise",
  slug: "emma-fielding-mystery",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "531963",
      externalLink: "https://www.themoviedb.org/collection/531963",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Emma Fielding Mystery",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
