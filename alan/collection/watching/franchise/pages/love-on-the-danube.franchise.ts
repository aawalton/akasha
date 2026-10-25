import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const loveOnTheDanube = {
  id: "01a17497-195a-792a-a290-0aaf14831099",
  type: "page-type/franchise",
  slug: "love-on-the-danube",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329922",
      externalLink: "https://www.themoviedb.org/collection/1329922",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Danube",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
