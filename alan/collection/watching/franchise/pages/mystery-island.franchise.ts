import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mysteryIsland = {
  id: "01a17497-195a-7285-af95-62d1abe4202b",
  type: "page-type/franchise",
  slug: "mystery-island",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1458626",
      externalLink: "https://www.themoviedb.org/collection/1458626",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Island",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
