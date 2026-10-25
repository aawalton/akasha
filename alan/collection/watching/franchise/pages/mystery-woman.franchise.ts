import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mysteryWoman = {
  id: "01a17497-195a-77ea-b5c0-5335bd17ba1c",
  type: "page-type/franchise",
  slug: "mystery-woman",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "449530",
      externalLink: "https://www.themoviedb.org/collection/449530",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
