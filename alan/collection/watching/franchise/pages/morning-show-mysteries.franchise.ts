import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const morningShowMysteries = {
  id: "01a17497-195a-7b1e-b452-76d26e6a58c0",
  type: "page-type/franchise",
  slug: "morning-show-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "632051",
      externalLink: "https://www.themoviedb.org/collection/632051",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
