import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const picturePerfectMysteries = {
  id: "01a17497-195b-7024-a41a-589998602d4f",
  type: "page-type/franchise",
  slug: "picture-perfect-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "675255",
      externalLink: "https://www.themoviedb.org/collection/675255",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Picture Perfect Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
