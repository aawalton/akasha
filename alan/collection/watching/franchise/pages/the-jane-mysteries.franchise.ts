import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theJaneMysteries = {
  id: "01a17497-195b-7521-8a92-319ec3074aef",
  type: "page-type/franchise",
  slug: "the-jane-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329931",
      externalLink: "https://www.themoviedb.org/collection/1329931",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Jane Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
