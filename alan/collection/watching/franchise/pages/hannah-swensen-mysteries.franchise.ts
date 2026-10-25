import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const hannahSwensenMysteries = {
  id: "01a17497-1959-7e81-9208-829c48e5cf3d",
  type: "page-type/franchise",
  slug: "hannah-swensen-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364344",
      externalLink: "https://www.themoviedb.org/collection/364344",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hannah Swensen Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
