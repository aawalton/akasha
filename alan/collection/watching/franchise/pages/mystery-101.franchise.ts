import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mystery101 = {
  id: "01a17497-195a-7655-ae92-2f3edb73be9d",
  type: "page-type/franchise",
  slug: "mystery-101",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "659184",
      externalLink: "https://www.themoviedb.org/collection/659184",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
