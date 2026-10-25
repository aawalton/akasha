import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const northpole = {
  id: "01a17497-195b-71c9-b4d3-4ffd1a65265f",
  type: "page-type/franchise",
  slug: "northpole",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "400412",
      externalLink: "https://www.themoviedb.org/collection/400412",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Northpole",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
