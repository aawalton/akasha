import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const mrsMiracle = {
  id: "01a17497-195a-7588-963a-d0eae43c96fa",
  type: "page-type/franchise",
  slug: "mrs-miracle",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374663",
      externalLink: "https://www.themoviedb.org/collection/374663",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mrs. Miracle",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
