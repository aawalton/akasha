import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mrDarcy = {
  id: "01a17497-195a-7873-b2f7-3d50c54601be",
  type: "page-type/franchise",
  slug: "mr-darcy",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596906",
      externalLink: "https://www.themoviedb.org/collection/596906",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mr. Darcy",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
