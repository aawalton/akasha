import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const jingleBellS = {
  id: "01a17497-195a-7289-b885-720baf97ddf6",
  type: "page-type/franchise",
  slug: "jingle-bell-s",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "373660",
      externalLink: "https://www.themoviedb.org/collection/373660",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle & Bell's",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
