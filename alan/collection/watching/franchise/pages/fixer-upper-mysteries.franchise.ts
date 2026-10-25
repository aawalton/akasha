import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const fixerUpperMysteries = {
  id: "01a17497-1959-7c26-865b-9c8503a1490d",
  type: "page-type/franchise",
  slug: "fixer-upper-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "449244",
      externalLink: "https://www.themoviedb.org/collection/449244",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fixer Upper Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
