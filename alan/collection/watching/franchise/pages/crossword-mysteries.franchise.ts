import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const crosswordMysteries = {
  id: "01a17497-1958-7b72-8a7a-71676a0a1bf6",
  type: "page-type/franchise",
  slug: "crossword-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "659217",
      externalLink: "https://www.themoviedb.org/collection/659217",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crossword Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
