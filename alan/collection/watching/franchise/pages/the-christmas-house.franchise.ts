import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theChristmasHouse = {
  id: "01a17497-195b-7112-80c0-fa46876b676c",
  type: "page-type/franchise",
  slug: "the-christmas-house",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "950536",
      externalLink: "https://www.themoviedb.org/collection/950536",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas House",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
