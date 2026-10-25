import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const inTheVineyard = {
  id: "01a17497-195a-74d2-8808-9517a136d1cf",
  type: "page-type/franchise",
  slug: "in-the-vineyard",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "472917",
      externalLink: "https://www.themoviedb.org/collection/472917",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "In the Vineyard",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
