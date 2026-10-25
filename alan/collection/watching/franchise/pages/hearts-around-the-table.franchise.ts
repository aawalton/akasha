import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const heartsAroundTheTable = {
  id: "01a17497-1959-77ea-9d3e-1a33270b8d05",
  type: "page-type/franchise",
  slug: "hearts-around-the-table",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1445686",
      externalLink: "https://www.themoviedb.org/collection/1445686",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts Around the Table",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
