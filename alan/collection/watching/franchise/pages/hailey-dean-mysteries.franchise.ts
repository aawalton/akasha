import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const haileyDeanMysteries = {
  id: "01a17497-1959-7175-b5fb-954a1f15eb2b",
  type: "page-type/franchise",
  slug: "hailey-dean-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "667188",
      externalLink: "https://www.themoviedb.org/collection/667188",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hailey Dean Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
