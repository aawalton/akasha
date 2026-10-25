import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theGroomsmen = {
  id: "01a17497-195b-7efb-b76d-6e5f52ba33ec",
  type: "page-type/franchise",
  slug: "the-groomsmen",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353960",
      externalLink: "https://www.themoviedb.org/collection/1353960",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Groomsmen",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
