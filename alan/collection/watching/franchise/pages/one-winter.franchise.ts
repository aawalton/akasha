import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const oneWinter = {
  id: "01a17497-195b-71b7-ac64-b32928aaec5f",
  type: "page-type/franchise",
  slug: "one-winter",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "571901",
      externalLink: "https://www.themoviedb.org/collection/571901",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Winter",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
