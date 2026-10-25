import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const atGraceland = {
  id: "01a17497-1958-7c96-a227-885e3628decb",
  type: "page-type/franchise",
  slug: "at-graceland",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "635929",
      externalLink: "https://www.themoviedb.org/collection/635929",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "At Graceland",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
