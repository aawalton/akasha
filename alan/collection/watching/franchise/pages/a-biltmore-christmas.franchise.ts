import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const aBiltmoreChristmas = {
  id: "01a17497-1957-7ca2-a165-ed99c9b98f1f",
  type: "page-type/franchise",
  slug: "a-biltmore-christmas",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1602664",
      externalLink: "https://www.themoviedb.org/collection/1602664",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Biltmore Christmas",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
