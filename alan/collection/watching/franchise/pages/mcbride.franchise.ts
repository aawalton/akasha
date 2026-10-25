import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mcbride = {
  id: "01a17497-195a-732e-8f17-e9bc3e8a3ca1",
  type: "page-type/franchise",
  slug: "mcbride",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "450345",
      externalLink: "https://www.themoviedb.org/collection/450345",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
