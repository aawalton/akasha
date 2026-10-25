import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const chronicleMysteries = {
  id: "01a17497-1958-75ff-9e9f-49a357ec6dcf",
  type: "page-type/franchise",
  slug: "chronicle-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "584691",
      externalLink: "https://www.themoviedb.org/collection/584691",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
