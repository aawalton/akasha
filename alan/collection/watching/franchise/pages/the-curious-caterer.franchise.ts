import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theCuriousCaterer = {
  id: "01a17497-195b-7297-bba6-65ea4aabcf3b",
  type: "page-type/franchise",
  slug: "the-curious-caterer",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1083910",
      externalLink: "https://www.themoviedb.org/collection/1083910",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Curious Caterer",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
