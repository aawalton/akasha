import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const bigSkyRiver = {
  id: "01a17497-1958-79f8-a6e0-635f52fc6120",
  type: "page-type/franchise",
  slug: "big-sky-river",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146920",
      externalLink: "https://www.themoviedb.org/collection/1146920",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Big Sky River",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
