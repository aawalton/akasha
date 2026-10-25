import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const hauntedHarmonyMysteries = {
  id: "01a17497-1959-7b6a-9f9b-53e20efcc4a5",
  type: "page-type/franchise",
  slug: "haunted-harmony-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1604843",
      externalLink: "https://www.themoviedb.org/collection/1604843",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haunted Harmony Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
