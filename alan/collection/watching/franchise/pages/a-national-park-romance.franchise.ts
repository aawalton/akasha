import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const aNationalParkRomance = {
  id: "01a17497-1958-71b0-9cdf-93e7551114c0",
  type: "page-type/franchise",
  slug: "a-national-park-romance",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1154507",
      externalLink: "https://www.themoviedb.org/collection/1154507",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A National Park Romance",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
